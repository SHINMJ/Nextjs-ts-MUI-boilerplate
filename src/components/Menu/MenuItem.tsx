import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Icon from '@material-ui/core/Icon'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { IMenu } from '@stores'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
)

interface IMenuItem extends IMenu {
  drawerOpen: boolean
}

const MenuItem: React.FC<IMenuItem> = props => {
  const classes = useStyles()
  const { expanded, children, drawerOpen } = props
  const [open, setOpen] = useState<boolean>(expanded || false)
  const router = useRouter()

  const onClick = (sub: boolean, item: IMenu) => {
    if (children && !sub) {
      setOpen(!open)
    } else {
      router.push(item.url)
    }
  }

  const isActive = (url: string) => {
    return router.pathname === url
  }

  const setItem = (sub: boolean, item: IMenu) => (
    <ListItem
      button
      key={`list-item-${item.id}`}
      onClick={() => onClick(sub, item)}
      className={sub ? classes.nested : ''}
    >
      {item.icon && (
        <ListItemIcon>
          <Icon> {item.icon}</Icon>
        </ListItemIcon>
      )}
      <ListItemText key={`item-text-${item.id}`} primary={item.title} />
      {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
    </ListItem>
  )

  return (
    <>
      {setItem(false, props)}
      {children && (
        <Collapse in={open && drawerOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map(item => setItem(true, item))}
          </List>
        </Collapse>
      )}
    </>
  )
}

export default MenuItem
