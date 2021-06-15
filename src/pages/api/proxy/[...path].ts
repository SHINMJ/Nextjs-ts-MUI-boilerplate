import httpProxy, { ProxyResCallback } from 'http-proxy'
import Cookies from 'cookies'
import url from 'url'
import { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_TOKEN, SERVER_API_URL } from '@constants/env'

const proxy = httpProxy.createProxyServer()

export const config = {
  api: {
    bodyParser: true,
  },
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve, reject) => {
    const pathname = url.pathToFileURL(req.url).pathname
    const isLogin = pathname === '/api/proxy/v1/login'

    const cookies = new Cookies(req, res)
    const authToken = cookies.get(AUTH_TOKEN)

    // rewrite url
    // /api/proxy/*  => ${SERVER_URL}/*
    req.url = req.url.replace(/^\/api\/proxy\/v1/, '')

    // 임시 url
    const serverurl =
      req.url.indexOf('/terms') > -1
        ? SERVER_API_URL
        : 'http://localhost:3000/api/v1'

    console.log(
      `req.url ${req.url}, serverurl: ${serverurl}, methods: ${req.method}`,
    )

    const bodyData = JSON.stringify(req.body)
    // console.log(req.body)

    // server API 에 쿠키를 전달하지 않음.
    req.headers.cookie = ''

    // 대신, header에 authentication 추가
    if (authToken) {
      req.headers[AUTH_TOKEN] = authToken
    }

    proxy
      .once('proxyReq', proxyReq => {
        if (bodyData !== '') {
          console.log('bodydata', bodyData)
          proxyReq.setHeader('Content-Type', 'application/json')
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
          // stream the content
          proxyReq.write(bodyData)
        }
      })
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
          console.log('proxyRes', res.statusCode)
          resolve()
        }
      })
      .once('error', reject)
      .web(req, res, {
        target: serverurl,
        autoRewrite: false,
        selfHandleResponse: isLogin,
      })
  })
}
