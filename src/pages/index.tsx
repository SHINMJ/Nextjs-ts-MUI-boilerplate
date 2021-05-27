import React, { useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Layout } from '@components/Layout'
import useUser from '@hooks/useUser'
import Loader from '@components/Loader'
import Router from 'next/router'

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {},
  }),
)

type Props = {
  initialLoginStatus: string
}

function Home(props: Props) {
  const classes = useStyles(props)
  const { user, loading } = useUser()
  console.log('props', props)

  useEffect(() => {
    if (!user) {
      Router.replace('/auth/login')
    }
  }, [user])

  if (loading) {
    return <Loader />
  }

  if (!user || user == null) {
    return null
  }

  return (
    <Layout>
      <Typography variant="h5">MSA Admin Template</Typography>
      <Typography variant="h6">msa admin template</Typography>
    </Layout>
  )
}

export default Home
