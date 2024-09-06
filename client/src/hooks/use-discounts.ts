import { useCallback } from 'react'
import discountsClient from '../api/discounts-client'
import useQuery from './use-query'

export function useDiscounts() {
  const callback = useCallback(
    async () => await discountsClient.getDiscounts(),
    []
  )
  const { data } = useQuery(callback)
  return data
}
