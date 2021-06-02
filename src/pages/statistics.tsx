import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    root: {},
  }),
)

type Props = {
  initialLoginStatus: string
}

function Statistics(props: Props) {
  const classes = useStyles(props)
  console.log('props', props)

  return (
    <>
      <Typography variant="h5">MSA Admin Template</Typography>
      <Typography variant="h6">Statistics</Typography>
    </>
  )
}

export default Statistics
