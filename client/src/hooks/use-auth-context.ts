import { useContext } from 'react'
import { AuthContext } from '../contexts/auth-provider'

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvicer context')
  }
  return context
}
