import { useMemo } from 'react'
import Api from '../api'
import { useTokenAtom } from './use-token-atom'

export const useApi = () => {
  const { token } = useTokenAtom()
  return useMemo(() => new Api(token), [token])
}
