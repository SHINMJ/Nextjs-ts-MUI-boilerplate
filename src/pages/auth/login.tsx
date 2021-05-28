import React, { useEffect } from 'react'
import LoginForm, { loginForm } from '@components/Auth/LoginForm'
import axios from 'axios'
import useUser from '@hooks/useUser'
import Router from 'next/router'

const Login = () => {
  const { mutate, isLogin, error } = useUser()

  useEffect(() => {
    if (isLogin) {
      Router.replace('/')
    }
  }, [isLogin])

  if (isLogin) {
    return <> Redirecting.... </>
  }

  const onLoginSubmit = async ({ email, password }: loginForm) => {
    try {
      console.log(`login submit ${email} : ${password}`)

      await axios.post('/api/proxy/login', { email, password })
      mutate()
    } catch (error) {
      mutate()
    }
  }

  return (
    <LoginForm
      handleLogin={onLoginSubmit}
      errorMessage={error?.response.data.message}
    />
  )
}

export default Login
