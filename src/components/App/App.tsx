import { Layout } from '@components/Layout'
import Loader from '@components/Loader'
import LoginLayout from '@components/LoginLayout'
import { API_URL } from '@constants/env'
import useUser from '@hooks/useUser'
import { menusState } from '@stores'
import axios from 'axios'
import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

type AppProps = {
  component: NextComponentType<any, any, any>
  pathname?: string
  req?: NextPageContext['req']
}

const App = ({ component: Component, ...pageProps }: AppProps) => {
  const { user, loading, isLogin } = useUser()
  const setMenus = useSetRecoilState(menusState)
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

  if (loading) {
    return <Loader />
  }

  if (!isUnAuthPage && user == null) {
    return null
  }

  if (!isUnAuthPage && !user) {
    return null
  }

  console.log(`pathname: ${pathname} , authLayout: ${authLayout}`)
  console.log('pageProps', pageProps)
  console.log('router.query', router)

  return pathname !== undefined && authLayout ? (
    <LoginLayout>
      <Component pathname={pathname} {...pageProps} />
    </LoginLayout>
  ) : (
    <Layout title={(router.query?.title as string) || ''}>
      <Component pathname={pathname} {...pageProps} />
    </Layout>
  )
}

export default App
