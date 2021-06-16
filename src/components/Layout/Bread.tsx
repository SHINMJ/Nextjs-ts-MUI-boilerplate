import { CircularProgress, Container, Typography } from '@material-ui/core'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { currentMenuState, menusState } from '@stores'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilValue } from 'recoil'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // marginBottom: theme.spacing(1),
  },
}))

const Bread: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const menus = useRecoilValue(menusState)
  const current = useRecoilValue(currentMenuState)

  console.log('current', current)

  console.log('bread!!!')
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault()
    router.push('/')
  }
  return (
    <div className={classes.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Home
        </Link>
        <Link
          color="inherit"
          href="/getting-started/installation/"
          onClick={handleClick}
        >
          Core
        </Link>
        {current && (
          <Typography color="textPrimary">{current.title}</Typography>
        )}
      </Breadcrumbs>
    </div>
  )
}

export default Bread
