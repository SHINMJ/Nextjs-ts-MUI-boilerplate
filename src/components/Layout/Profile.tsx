import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

export interface IProfile {
  id: string
}

/**
 * @TODO
 * hook을 이용한 사용자 정보 세팅
 * 각 메뉴 아이템에 대한 onclick 이벤트 처리
 */

const Profile: React.FC<IProfile> = (props: IProfile) => {
  const { id } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  const onClickLogout = (e: React.MouseEvent<HTMLElement>) => {
    router.replace('/auth/logout')
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem>
          <a href="/auth/logout">Logout</a>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Profile
