import React, { useState } from 'react'
import Link from 'next/link'
import Icon from '@material-ui/core/Icon'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Collapse } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

export interface IMenuItem {
  title: string
  id: string
  url?: string
  icon?: string
  expanded?: boolean
  hidden?: boolean
  children?: IMenuItem[]
}

const MenuItem: React.FC<IMenuItem> = props => {
  const { title, id, url, icon, expanded, hidden, children } = props
  const [open, setOpen] = useState<boolean>(expanded || false)

  const onClick = () => {
    if (children) {
      setOpen(!open)
    }
  }

  return (
    <>
      <ListItem button key={id} onClick={onClick}>
        {icon && <Icon> {icon}</Icon>}
        {url && (
          <Link href={url}>
            <ListItemText primary={title} />
          </Link>
        )}
        {!url && <ListItemText primary={title} />}
        {children && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
    </>
  )
}

export default MenuItem
