import React from 'react'
import { List } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useRecoilValue } from 'recoil'
import { menusState } from '@stores'
import MenuItem from './MenuItem'

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
