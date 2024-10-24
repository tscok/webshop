import { Avatar, Button } from '@mui/material'
import { useUser } from '../../hooks/use-user'

const User = (props: { src?: string }) => (
  <Avatar {...props} sx={{ width: 24, height: 24 }} />
)

export const UserProfile = () => {
  const { onLogin, onLogout, user } = useUser()

  return (
    <Button
      onClick={user ? onLogout : onLogin}
      startIcon={<User src={user?.picture} />}
      sx={{ minWidth: 100, justifyContent: 'start' }}
    >
      {user ? 'Logout' : 'Login'}
    </Button>
  )
}
