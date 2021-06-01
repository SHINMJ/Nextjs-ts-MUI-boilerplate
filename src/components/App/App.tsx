import { Layout } from '@components/Layout'
import Loader from '@components/Loader'
import LoginLayout from '@components/LoginLayout'
import useUser from '@hooks/useUser'
import { menusState } from '@modules'
import axios from 'axios'
import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

type AppProps = {
  component: NextComponentType<any, any, any>
  pathname: string
  req?: NextPageContext['req']
  title?: string
}

const App = ({ component: Component, pathname, ...pageProps }: AppProps) => {
  const { user, loading, isLogin } = useUser()
  const setMenus = useSetRecoilState(menusState)
  const authLayout = pathname.startsWith('/auth')
  const isUnAuthPage = pathname !== undefined && authLayout
  const router = useRouter()

  useEffect(() => {
    if (!isUnAuthPage && user == undefined) {
      router.replace('/auth/login')
    }
  }, [user, isUnAuthPage, pathname])

  useEffect(() => {
    if (isLogin) {
      const getMenus = async () => {
        const result = await axios.get('/api/proxy/demo/menus')
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

  return pathname !== undefined && authLayout ? (
    <LoginLayout>
      <Component pathname={pathname} {...pageProps} />
    </LoginLayout>
  ) : (
    <Layout title={pageProps.title}>
      <Component pathname={pathname} {...pageProps} />
    </Layout>
  )
}

export default App
