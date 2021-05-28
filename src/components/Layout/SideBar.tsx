import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Link from '@material-ui/core/Link'
import { DRAWER_WIDTH } from '@constants'
import { Menu } from '@components/Menu'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    logo: {
      position: 'relative',
      padding: theme.spacing(0, 1),
      zIndex: 4,
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '0',

        height: '1px',
        right: '15px',
        width: 'calc(100% - 30px)',
      },
    },
    logoLink: {
      textTransform: 'uppercase',
      padding: '5px 0',
      display: 'block',
      fontSize: '18px',
      textAlign: 'left',
      lineHeight: '30px',
      textDecoration: 'none',
      backgroundColor: 'transparent',
      fontWeight: 400,
    },
    logoImage: {
      width: '30px',
      display: 'inline-block',
      maxHeight: '30px',
      marginLeft: '10px',
      marginRight: '15px',
    },
    img: {
      width: '35px',
      top: '22px',
      position: 'absolute',
      verticalAlign: 'middle',
      border: '0',
    },
  }),
)

interface ISideBar {
  open: boolean
  onClick: () => void
  logo?: string
  logoText?: string
}

const SideBar = (props: ISideBar) => {
  const { open, onClick, logo, logoText } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.drawerHeader}>
        {logo && (
          <div className={classes.logo}>
            <Link
              href="/"
              onClick={() => router.push('/')}
              className={classes.logoLink}
            >
              <span className={classes.logoLink}>{logoText}</span>
            </Link>
          </div>
        )}
        <IconButton onClick={onClick}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <Menu menus={[]} />
    </Drawer>
  )
}

export default SideBar
