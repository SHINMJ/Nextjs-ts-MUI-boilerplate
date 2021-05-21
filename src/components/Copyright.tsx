import React from 'react'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
