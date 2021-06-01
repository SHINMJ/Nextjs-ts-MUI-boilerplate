import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Layout } from '@components/Layout'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    content: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    pos: {
      marginBottom: '3rem',
    },
  }),
)

const Error404: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  return (
    <Card>
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          404 Not Found
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          The page you were looking for doesn&apos;t exist
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/')}
        >
          Back to Home
        </Button>
      </CardContent>
    </Card>
  )
}

export default Error404
