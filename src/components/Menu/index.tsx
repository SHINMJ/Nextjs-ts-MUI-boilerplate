import React from 'react'
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { NextPage } from 'next'
import Link from 'next/link'
import Icon from '@material-ui/core/Icon'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { menusState } from '@stores'
import MenuItem from './MenuItem'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

const useStyles = makeStyles((theme: Theme) => createStyles({}))

const Menu = ({ open }) => {
  const classes = useStyles()
  const menus = useRecoilValue(menusState)
  // const

  // const onClick = () => {}

  return (
    <List component="nav">
      {menus.map((prop, index) => (
        <MenuItem key={`${prop.id} ${index}`} {...prop} drawerOpen={open} />
      ))}
    </List>
  )
}

export { Menu }
