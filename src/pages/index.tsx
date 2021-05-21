import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Layout } from '@components/Layout'
import useUser from '@hooks/useUser'

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {},
  }),
)

type Props = {}

export default function Home(props: Props) {
  const classes = useStyles(props)
  // const user = useUser({})

  return (
    <Layout title="Home">
      <Typography variant="h5">MSA Admin Template</Typography>
      <Typography variant="h6">msa admin template</Typography>
      {/* {user && <p>{user}</p>} */}
    </Layout>
  )
}
