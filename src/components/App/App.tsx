import { Layout } from '@components/Layout'
import Loader from '@components/Loader/Loader'
import LoginLayout from '@components/LoginLayout/LoginLayout'
import useUser from '@hooks/useUser'
import { NextComponentType, NextPageContext } from 'next'
import Router from 'next/router'
import React, { useEffect } from 'react'

type AppProps = {
  component: NextComponentType<any, any, any>
  pathname: string
  req?: NextPageContext['req']
}

const App = ({ component: Component, pathname, ...pageProps }: AppProps) => {
  const { user, loading, error } = useUser({})
  const authLayout = pathname.startsWith('/auth')
  const isUnAuthPage = pathname !== undefined && authLayout

  useEffect(() => {
    if (!isUnAuthPage && user == null) {
      Router.push('/auth/login')
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

  console.log('pathname : ', pathname)

  return pathname !== undefined && authLayout ? (
    <LoginLayout>
      <Component pathname={pathname} {...pageProps} />
    </LoginLayout>
  ) : (
    <Layout>
      <Component pathname={pathname} user={user} {...pageProps} />
    </Layout>
  )
}

export default App
