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

import { IMenu } from '@modules'

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
  const { id, url, expanded, children, drawerOpen } = props
  const [open, setOpen] = useState<boolean>(expanded || false)
  const router = useRouter()

  const onClick = (sub: boolean, link?: string, title?: string) => {
    if (children && !sub) {
      setOpen(!open)
    } else {
      router.push(`${link}?title=${title}`, link)
    }
  }

  const isActive = (url: string) => {
    return router.pathname === url
  }

  const setItem = (prop: IMenu, sub: boolean) => (
    <ListItem
      button
      key={`list-item-${prop.id}`}
      onClick={() => onClick(sub, prop.url, prop.title)}
      className={sub ? classes.nested : ''}
    >
      {prop.icon && (
        <ListItemIcon>
          <Icon> {prop.icon}</Icon>
        </ListItemIcon>
      )}
      <ListItemText key={`item-text-${prop.id}`} primary={prop.title} />
      {prop.children && (open ? <ExpandLess /> : <ExpandMore />)}
    </ListItem>
  )

  return (
    <>
      {
        url &&
          // <Link href={url} passHref key={`item-link-${id}`}>
          setItem(props, false)
        // </Link>
      }
      {!url && setItem(props, false)}
      {children && (
        <Collapse in={open && drawerOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map(
              prop =>
                // <Link href={prop.url} passHref key={`sub-link-${prop.id}`}>
                setItem(prop, true),
              // </Link>
            )}
          </List>
        </Collapse>
      )}
    </>
  )
}

export default MenuItem
