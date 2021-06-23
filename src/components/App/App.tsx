import React, { useCallback, useEffect } from 'react'
import axios from 'axios'
import { NextComponentType, NextPageContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Layout } from '@components/Layout'
import Loader from '@components/Loader'
import LoginLayout from '@components/LoginLayout'
import { API_URL } from '@constants/env'

import useUser from '@hooks/useUser'
import { currentMenuState, flatMenusSelect, IMenu, menusState } from '@stores'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

type AppProps = {
  component: NextComponentType<any, any, any>
  pathname?: string
  req?: NextPageContext['req']
}

const App = ({ component: Component, ...pageProps }: AppProps) => {
  const router = useRouter()
  const pathname = router.pathname
  const authLayout = pathname.startsWith('/auth')
  const isUnAuthPage = pathname !== undefined && authLayout

  const { user, loading, isLogin } = useUser()

  const [menus, setMenus] = useRecoilState(menusState)
  const [currentMenu, setCurrentMenu] = useRecoilState(currentMenuState)
  const flatMenus = useRecoilValue(flatMenusSelect)

  useEffect(() => {
    if (!loading && !isUnAuthPage && user === undefined) {
      router.replace('/auth/login')
    }
  }, [user, isUnAuthPage, pathname, loading])

  useEffect(() => {
    if (isLogin) {
      const getMenus = async () => {
        const result = await axios.get(`${API_URL}/menus`)
        if (result) {
          setMenus(result.data)
        }
      }

      getMenus()
    }
  }, [isLogin])

  //current menu
  const findCurrent = useCallback(
    (path: string) => {
      return flatMenus.find(item => item.url === path)
    },
    [menus],
  )

  useEffect(() => {
    if (!isUnAuthPage) {
      let current: IMenu | undefined = undefined
      let paths = router.asPath
      while (true) {
        current = findCurrent(paths)
        paths = paths.substring(0, paths.lastIndexOf('/'))
        if (current || paths.length < 1) {
          break
        }
      }
      setCurrentMenu(current)
    }
  }, [pathname, menus])

  if (loading) {
    return <Loader />
  }

  if (!isUnAuthPage && user == null) {
    return null
  }

  if (!isUnAuthPage && !user) {
    return null
  }

  return (
    <>
      <Head>
        <title>{currentMenu?.title || 'Admin Template'}</title>
      </Head>
      {pathname !== undefined && authLayout ? (
        <LoginLayout>
          <Component pathname={pathname} {...pageProps} />
        </LoginLayout>
      ) : (
        <Layout>
          <Component pathname={pathname} {...pageProps} />
        </Layout>
      )}
    </>
  )
}

export default App
