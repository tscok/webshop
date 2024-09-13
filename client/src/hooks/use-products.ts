import { useCallback } from 'react'
import productsClient from '../api/products-client'
import useQuery from './use-query'

export function useProducts() {
  const callback = useCallback(
    async () => await productsClient.getProducts(),
    []
  )
  const { data = [] } = useQuery(callback)
  return data
}
