import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {},
  }),
)

function Post(props) {
  const classes = useStyles(props)
  console.log('props', props)

  return (
    <>
      <Typography variant="h5">Post</Typography>
      <Typography variant="h6">Board </Typography>
    </>
  )
}

export default Post
