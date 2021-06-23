import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

import Icon from '@material-ui/core/Icon'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { currentMenuState, IMenu } from '@stores'
import theme from '@styles/theme'
import { useRecoilValue } from 'recoil'
import classNames from 'classnames'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    menuItem: {
      borderBottom: '1px solid #edf1f7',
      display: 'flex',
      overflow: 'hidden',
      width: 'auto',
      transition: 'all 300ms linear',
      position: 'relative',
      backgroundColor: 'transparent',
    },
    active: {
      color: theme.palette.primary.main,
    },
  }),
)

interface IMenuItem extends IMenu {
  drawerOpen: boolean
}

const MenuItem: React.FC<IMenuItem> = props => {
  const { expanded, drawerOpen } = props
  const classes = useStyles()
  const router = useRouter()

  const current = useRecoilValue(currentMenuState)

  const [open, setOpen] = useState<boolean>(expanded || false)

  const onClick = (item: IMenu) => {
    if (item.children) {
      setOpen(!open)
    } else {
      router.push(item.url)
    }
  }

  const drawItem = useCallback(
    (item: IMenu) => {
      const active = current?.id === item.id ? true : false

      return (
        <div key={`list-item-div-${item.id}`} className={classes.root}>
          <ListItem
            button
            key={`list-item-${item.id}`}
            onClick={() => onClick(item)}
            className={`${classes.menuItem} ${active ? classes.active : null}`}
            style={{ paddingLeft: theme.spacing(item.level * 3) }}
          >
            {item.icon && (
              <ListItemIcon className={active ? classes.active : null}>
                <Icon> {item.icon}</Icon>
              </ListItemIcon>
            )}
            <ListItemText key={`item-text-${item.id}`} primary={item.title} />
            {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          {item.children ? (
            <Collapse in={open && drawerOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map(i => drawItem(i))}
              </List>
            </Collapse>
          ) : null}
        </div>
      )
    },
    [props, open],
  )

  return <>{drawItem(props)}</>
}

export default MenuItem
