import { Layout } from '@components/Layout'
import Loader from '@components/Loader'
import LoginLayout from '@components/LoginLayout'
import useUser from '@hooks/useUser'
import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

type AppProps = {
  component: NextComponentType<any, any, any>
  pathname: string
  req?: NextPageContext['req']
}

const App = ({ component: Component, pathname, ...pageProps }: AppProps) => {
  const { user, loading } = useUser()
  const authLayout = pathname.startsWith('/auth')
  const isUnAuthPage = pathname !== undefined && authLayout
  const router = useRouter()

  useEffect(() => {
    if (!isUnAuthPage && user == undefined) {
      router.replace('/auth/login')
    }
  }, [user, isUnAuthPage, pathname])

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

  return pathname !== undefined && authLayout ? (
    <LoginLayout>
      <Component pathname={pathname} {...pageProps} />
    </LoginLayout>
  ) : (
    <Layout>
      <Component pathname={pathname} {...pageProps} />
    </Layout>
  )
}

export default App
