import React, { useEffect, useState } from 'react'
import LoginForm, { loginForm } from '@components/Auth/LoginForm'
import axios from 'axios'
import useUser from '@hooks/useUser'
import Router from 'next/router'
import Loader from '@components/Loader'
import LoginLayout from '@components/LoginLayout'

const Login = () => {
  const { mutate, isLogin, user, error } = useUser()

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
      console.log(`${email} : ${password}`)

      await axios.post('/api/proxy/login', { email, password })
      mutate()
    } catch (error) {
      mutate()
    }
  }

  return (
    <LoginLayout>
      <LoginForm
        handleLogin={onLoginSubmit}
        errorMessage={error?.response.data.message}
      />
    </LoginLayout>
  )
}

export default Login
