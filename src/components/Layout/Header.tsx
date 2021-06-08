import React from 'react'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

import { DRAWER_WIDTH } from '@constants'
import Profile from './Profile'
import useUser from '@hooks/useUser'
import { PageProps } from '@pages/_app'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { currentMenuState } from '@stores'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: 'none',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
  }),
)

export interface IHeader {
  open: boolean
  onClick: () => void
}

const Header: React.FC<IHeader> = (props: IHeader) => {
  const { open, onClick } = props
  const classes = useStyles()
  const { user } = useUser()
  const currentMenu = useRecoilValue(currentMenuState)

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onClick}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" noWrap className={classes.title}>
          {currentMenu?.title || 'Admin Template'}
        </Typography>
        {user && <Profile id={user.email} />}
      </Toolbar>
    </AppBar>
  )
}

export default Header
