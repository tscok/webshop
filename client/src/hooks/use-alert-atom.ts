import { useCallback, useMemo } from 'react'
import { useAtom, alertAtom } from '../libs/jotai'
import type { AlertType } from '../libs/jotai'

export const useAlertAtom = () => {
  const [atomValue, setAtomValue] = useAtom(alertAtom)

  const setAlert = useCallback(
    (message: string, type: AlertType) => setAtomValue({ message, type }),
    [setAtomValue]
  )

  const resetAlert = useCallback(() => setAtomValue(null), [setAtomValue])

  const alert = useMemo(() => atomValue, [atomValue])

  return { alert, setAlert, resetAlert }
}
