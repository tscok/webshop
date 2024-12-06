import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAuthContext } from '../../hooks/use-auth-context'
import { useApi } from '../../hooks/use-api'
import { useAlertAtom } from '../../hooks/use-alert-atom'

export const LoginForm = () => {
  const { onChange, form, user, ...auth } = useAuthContext()
  const { alert } = useAlertAtom()
  const api = useApi()

  const isEmpty = form.email.trim() === '' && form.password.trim() === ''

  const handleVerification = async () => {
    try {
      const result = await api.verifyUser()
      console.log('Verified:', result)
    } catch (err) {
      console.error('Not verified', err)
    }
  }

  return (
    <Stack spacing={2}>
      <TextField
        error={alert?.type === 'error'}
        fullWidth
        label="Email"
        onChange={(event) => onChange('email', event.target.value)}
        type="email"
        value={form.email}
      />
      <TextField
        error={alert?.type === 'error'}
        fullWidth
        label="Password"
        onChange={(event) => onChange('password', event.target.value)}
        type="password"
        value={form.password}
      />
      {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
      <Stack direction="row" justifyContent="space-between">
        <FormControlLabel
          control={
            <Checkbox
              checked={form.persistence}
              onChange={(event) =>
                onChange('persistence', event.target.checked)
              }
            />
          }
          label="Keep me signed in"
          sx={{ userSelect: 'none' }}
        />
        <Link
          component="button"
          onClick={() => form.email.trim() && auth.resetPassword()}
        >
          Reset password
        </Link>
      </Stack>
      <Button
        disableElevation
        onClick={() => !isEmpty && auth.signIn()}
        size="large"
        variant="contained"
      >
        Sign in
      </Button>
      <Button
        size="large"
        onClick={() => !isEmpty && auth.signUp()}
        variant="outlined"
      >
        Sign up
      </Button>
      <Button size="large" onClick={auth.signOut} variant="text">
        Sign out
      </Button>
      <Button size="large" onClick={handleVerification} variant="text">
        Verify
      </Button>
      {user && <Typography>Signed in as: {user.email}</Typography>}
    </Stack>
  )
}
