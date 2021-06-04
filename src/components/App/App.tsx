import { Layout } from '@components/Layout'
import Loader from '@components/Loader'
import LoginLayout from '@components/LoginLayout'
import { API_URL } from '@constants/env'
import useUser from '@hooks/useUser'
import { currentMenuState, menusState } from '@stores'
import axios from 'axios'
import { NextComponentType, NextPageContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

type AppProps = {
  component: NextComponentType<any, any, any>
  pathname?: string
  req?: NextPageContext['req']
}

const App = ({ component: Component, ...pageProps }: AppProps) => {
  const { user, loading, isLogin } = useUser()
  const [menus, setMenus] = useRecoilState(menusState)
  const [currentMenu, setCurrentMenu] = useRecoilState(currentMenuState)
  const router = useRouter()
  const pathname = router.pathname
  const authLayout = pathname.startsWith('/auth')
  const isUnAuthPage = pathname !== undefined && authLayout

  useEffect(() => {
    if (!loading && !isUnAuthPage && user === undefined) {
      router.replace('/auth/login')
    }
  }, [user, isUnAuthPage, pathname, loading])

  useEffect(() => {
    if (isLogin) {
      const getMenus = async () => {
        const result = await axios.get(`${API_URL}/demo/menus`)
        if (result) {
          setMenus(result.data)
        }
      }

      getMenus()
    }
  }, [isLogin])

  useEffect(() => {
    if (!isUnAuthPage) {
      const current =
        menus.find(ele => ele.url === router.asPath) ||
        menus.reduce((prev, curr) => {
          return prev || curr.children?.find(ele => ele.url === router.asPath)
        }, undefined)
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

  console.log('router.query', router.query)

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
