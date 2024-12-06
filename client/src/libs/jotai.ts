import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { TOKEN_NAME } from './firebase'

export { useAtom, useAtomValue } from 'jotai'
export { RESET } from 'jotai/utils'

export type TokenType = string | undefined

const storage = createJSONStorage<TokenType>(() => window.sessionStorage)

export const tokenAtom = atomWithStorage<TokenType>(
  TOKEN_NAME,
  undefined,
  storage
)

export type AlertType = 'error' | 'info' | 'success'

export const alertAtom = atom<{ message: string; type: AlertType } | null>(null)
