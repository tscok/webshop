import { useCallback, useEffect, useState } from 'react'

type QueryState<T> = {
  data?: T
  error?: Error
  status: 'loading' | 'idle'
}

export default function useQuery<T>(request: () => Promise<T>) {
  const [state, setState] = useState<QueryState<T>>({ status: 'idle' })

  const updateState = useCallback(
    (update: Partial<QueryState<T>>) =>
      setState((prev) => ({ ...prev, ...update })),
    []
  )

  const fetchCallback = useCallback(async () => {
    try {
      updateState({ status: 'loading' })
      const response = await request()
      updateState({ data: response, status: 'idle' })
    } catch (e) {
      updateState({ error: e as Error, status: 'idle' })
    }
  }, [request, updateState])

  useEffect(() => {
    fetchCallback()
  }, [fetchCallback])

  return { ...state, refetch: () => fetchCallback() }
}
