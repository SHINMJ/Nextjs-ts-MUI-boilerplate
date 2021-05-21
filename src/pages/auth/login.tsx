import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Layout } from '@components/Layout'
import LoginForm from '@components/Auth/LoginForm'
import { NextPageContext } from 'next'
import { PageProps } from '@pages/_app'

export const handleAuthError = (
  ctx: NextPageContext,
): { isAuthError: boolean } | undefined => {
  if (ctx.query.authError === 'true') {
    return { isAuthError: true }
  }
}

interface ILogin extends PageProps {
  error?: string
}

const Login = (props: ILogin) => {
  return <LoginForm {...props} />
}

Login.getInitialProps = handleAuthError

export default Login
