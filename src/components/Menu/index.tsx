import React from 'react'
import { List } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import MenuItem from './MenuItem'
import { useRecoilValue } from 'recoil'
import { menusState } from '@stores'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      listStyle: 'none',
      position: 'unset',
    },
  }),
)

const Menu = ({ open }) => {
  const classes = useStyles()
  const menus = useRecoilValue(menusState)

  return (
    <List component="nav" className={classes.root}>
      {menus.map(prop => (
        <MenuItem key={`menu-item-${prop.id}`} {...prop} drawerOpen={open} />
      ))}
    </List>
  )
}

export { Menu }
