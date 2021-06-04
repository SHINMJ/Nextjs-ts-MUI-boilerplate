import React, { useEffect } from 'react'
import Head from 'next/head'
import { AppContext, AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '@styles/theme'
import App from '@components/App/App'
import { NextPageContext } from 'next'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { currentMenuState } from '@stores'

export type PageProps = {
  pathname?: string
  query?: NextPageContext['query']
  req?: NextPageContext['req']
}

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <Component {...pageProps} /> */}
        <App component={Component} {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )
}

// MyApp.getInitialProps = async ({ Component, ctx, router }: AppContext) => {
//   let pageProps: PageProps = {}
//   const locale = router.locale

//   if (Component.getInitialProps) {
//     const componentInitialProps = await Component.getInitialProps(ctx)
//     if (componentInitialProps) {
//       pageProps = componentInitialProps
//     }
//   }

//   global.__localeId__ = locale
//   pageProps.pathname = ctx.pathname

//   return { pageProps }
// }

export default MyApp
