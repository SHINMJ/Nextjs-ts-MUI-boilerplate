import React from 'react'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Copyright from '@components/Copyright'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    position: 'relative',
    overflow: 'hidden',
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}))
const Footer: React.FC = () => {
  const classes = useStyles()

  return (
    <Container component="footer" className={classes.footer}>
      <Typography variant="body1">Footer</Typography>
      <Copyright />
    </Container>
  )
}

export default Footer
