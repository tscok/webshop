import { useCallback, useEffect, useState } from 'react'

type QueryState<T> = {
  data?: T
  error?: Error
  status: QueryStatus
}

export type QueryStatus = 'loading' | 'idle'

export default function useQuery<T>(request: () => Promise<T>) {
  const [state, setState] = useState<QueryState<T>>({ status: 'idle' })

  const fetchCallback = useCallback(async () => {
    try {
      setState({ status: 'loading' })
      const response = await request()
      setState({ data: response, status: 'idle' })
    } catch (e) {
      setState({ error: e as Error, status: 'idle' })
    }
  }, [request])

  useEffect(() => {
    fetchCallback()
  }, [fetchCallback])

  return state
}
