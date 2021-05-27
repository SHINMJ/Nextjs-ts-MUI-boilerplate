import { AUTH_TOKEN } from '@constants'

function getInitialProps({ req, res }) {
  if (!process.browser) {
    const Cookies = require('cookies')
    const cookies = new Cookies(req, res)

    // Delete the cookie by not setting a value
    cookies.set(AUTH_TOKEN)

    res.writeHead(307, { Location: '/' })
    res.end()
  } else {
    return {}
  }
}

function Logout() {
  return (
    <div>
      <a href="/auth/logout">Logout</a>
    </div>
  )
}

Logout.getInitialProps = getInitialProps

export default Logout
