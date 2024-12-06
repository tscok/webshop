import { useCallback, useMemo } from 'react'
import { useAtom, tokenAtom, RESET } from '../libs/jotai'

export const useTokenAtom = () => {
  const [atomValue, setAtomValue] = useAtom(tokenAtom)

  const setToken = useCallback(
    (value: string) => setAtomValue(value),
    [setAtomValue]
  )

  const resetToken = useCallback(() => setAtomValue(RESET), [setAtomValue])

  const token = useMemo(() => atomValue, [atomValue])

  return { setToken, resetToken, token }
}
