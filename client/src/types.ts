type TypeOf<T, K> = K extends keyof T ? T[K] : never

export type OnChange<T extends object> = <
  K extends keyof T,
  U extends TypeOf<T, K>
>(
  key: K,
  value: U
) => void

export type AuthForm = {
  email: string
  password: string
  persistence: boolean
}
