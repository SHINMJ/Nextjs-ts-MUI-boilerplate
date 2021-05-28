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
import { IMenuItem } from './MenuItem'
import { useRouter } from 'next/router'

interface IMenu {
  menus: IMenuItem[]
}

const useStyles = makeStyles((theme: Theme) => createStyles({}))

const Menu: NextPage<IMenu> = ({ menus }) => {
  const router = useRouter()

  const items = menus.map(({ title, id, url, icon, children }, index) => {
    return (
      <ListItem button key={id}>
        {icon && <Icon> {icon}</Icon>}
        {url && (
          <Link href={url}>
            <ListItemText primary={title} />
          </Link>
        )}
        {!url && <ListItemText primary={title} />}
        {children && (
          <Collapse>
            <List component="div" disablePadding>
              {children.map(props => (
                <ListItem button key={props.id}>
                  <ListItemIcon>{icon && <Icon>{icon}</Icon>}</ListItemIcon>
                  {url && (
                    <Link href={url}>
                      <ListItemText primary={title} />
                    </Link>
                  )}
                  {!url && <ListItemText primary={title} />}
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </ListItem>
    )
  })

  return <List>{items}</List>
}

export { Menu }
