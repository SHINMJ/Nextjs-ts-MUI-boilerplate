import { CircularProgress, Container, Typography } from '@material-ui/core'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { currentMenuState, flatMenusSelect } from '@stores'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { useRecoilValue } from 'recoil'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // marginBottom: theme.spacing(1),
  },
}))

const Bread: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const flatMenus = useRecoilValue(flatMenusSelect)
  const current = useRecoilValue(currentMenuState)

  const hierarchy = useCallback(() => {
    if (!current) {
      return
    }

    if (current?.level === 1) {
      return <Typography color="textPrimary">{current.title}</Typography>
    }

    let trees = []
    const arr = flatMenus.slice(
      0,
      flatMenus.findIndex(item => item.id === current.id) + 1,
    )

    arr.reverse().some(item => {
      trees.push(item)
      if (item.level === 1) {
        return true
      }
    })

    let nodes = trees.reverse().map(item =>
      item.id === current.id ? (
        <Typography key={current.id} color="textPrimary">
          {current.title}
        </Typography>
      ) : (
        <Link
          key={item.id}
          color="inherit"
          href="/getting-started/installation/"
          onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            handleClick(event, item.url)
          }}
        >
          {item.title}
        </Link>
      ),
    )

    return nodes
  }, [current])

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url: string,
  ) => {
    event.preventDefault()
    if (url) {
      router.push(url)
    }
  }
  return (
    <div className={classes.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link
          color="inherit"
          href="/"
          onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            handleClick(event, '/')
          }}
        >
          Home
        </Link>
        {hierarchy()}
      </Breadcrumbs>
    </div>
  )
}

export default Bread
