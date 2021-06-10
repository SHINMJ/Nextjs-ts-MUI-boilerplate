import httpProxy, { ProxyResCallback } from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'
import { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_TOKEN, SERVER_API_URL } from '@constants/env'

const proxy = httpProxy.createProxyServer()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    const pathname = url.pathToFileURL(req.url).pathname
    const isLogin = pathname === '/api/proxy/demo/login'

    const cookies = new Cookies(req, res)
    const authToken = cookies.get(AUTH_TOKEN)

    console.log(pathname)

    // rewrite url
    // /api/proxy/*  => ${SERVER_URL}/*
    req.url = req.url.replace(/^\/api\/proxy/, '')

    // server API 에 쿠키를 전달하지 않음.
    req.headers.cookie = ''

    // 대신, header에 authentication 추가
    if (authToken) {
      req.headers[AUTH_TOKEN] = authToken
    }

    proxy
      .once('proxyRes', (proxyRes, req, res) => {
        if (isLogin) {
          let resBody = ''
          proxyRes.on('data', chunk => {
            resBody += chunk
          })

          proxyRes.on('end', () => {
            try {
              const { authToken } = JSON.parse(resBody)
              const cookies = new Cookies(req, res)
              cookies.set(AUTH_TOKEN, authToken, {
                httpOnly: true,
                sameSite: 'lax', //CSRF protection
              })

              console.log(`authToken = ${authToken}`)

              // res.status(200).json({ loggedIn: true })
              res.writeHead(200)
              res.end()

              resolve()
            } catch (error) {
              reject(error)
            }
          })
        } else {
          resolve()
        }
      })
      .once('error', reject)
      .web(req, res, {
        target: SERVER_API_URL,
        autoRewrite: false,
        selfHandleResponse: isLogin,
      })
  })
}
