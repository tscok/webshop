import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from '../state/query'
import Api from '../api'

const api = new Api()

export const useUser = () => {
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

  return {
    user,
    onLogin: () => login(),
    onLogout: () => logout(),
  }
}
