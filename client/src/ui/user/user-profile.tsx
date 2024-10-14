import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material'
import Login from '@mui/icons-material/Login'
import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'
import Person from '@mui/icons-material/Person'
import { useMutation, useQuery } from '@tanstack/react-query'
import Api from '../../api'
import { queryClient } from '../../state/query'
import { useState } from 'react'

const api = new Api()

export const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: api.getUser,
  })

  const { mutate: login } = useMutation({
    mutationFn: api.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const { mutate: logout } = useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <div>
      <IconButton
        onClick={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Person />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          My Account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider component="li" />
        <MenuItem onClick={() => (user ? logout() : login('Kalle'))}>
          <ListItemIcon>
            {user ? <Logout fontSize="small" /> : <Login fontSize="small" />}
          </ListItemIcon>
          {user ? 'Logout' : 'Login'}
        </MenuItem>
      </Menu>
    </div>
  )
}
