import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import * as firebase from '..//libs/firebase'
import type { AuthForm, OnChange } from '..//types'
import { useTokenAtom } from '..//hooks/use-token-atom'
import { useAlertAtom } from '..//hooks/use-alert-atom'

interface ContextType {
  form: AuthForm
  onChange: OnChange<AuthForm>
  resetPassword: () => Promise<void>
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  signUp: () => Promise<void>
  user: firebase.User | null
}

const defaultState: AuthForm = { email: '', password: '', persistence: true }

export const AuthContext = createContext<ContextType>({} as ContextType)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [form, setForm] = useState<AuthForm>(defaultState)
  const [currentUser, setCurrentUser] = useState<ContextType['user']>(null)
  const { setToken, resetToken } = useTokenAtom()
  const { alert, setAlert, resetAlert } = useAlertAtom()

  const onChange: OnChange<AuthForm> = (key, value) => {
    if (alert) resetAlert()
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetPassword = async () => {
    try {
      await firebase.resetPassword(form.email)
      setAlert(firebase.info('password-reset', form.email), 'info')
    } catch (err) {
      setAlert(firebase.error(err), 'error')
    }
  }

  const signIn = async () => {
    try {
      await firebase.signIn(form)
      setForm(defaultState)
      setAlert(firebase.info('sign-in', form.email), 'success')
      // TODO: route to /profile
    } catch (err) {
      setAlert(firebase.error(err), 'error')
    }
  }

  const signUp = async () => {
    try {
      await firebase.signUp(form)
      setForm(defaultState)
      // TODO: route to /profile
      setAlert(firebase.info('sign-up', form.email), 'success')
    } catch (err) {
      setAlert(firebase.error(err), 'error')
    }
  }

  const signOut = async () => {
    try {
      await firebase.signOut()
      resetToken()
    } catch (err) {
      setAlert(firebase.error(err), 'error')
    }
  }

  const context = {
    form,
    onChange,
    resetPassword,
    signIn,
    signOut,
    signUp,
    user: currentUser,
  }

  useEffect(() => {
    const unsubscribe = firebase.authObserver(async (user) => {
      const idToken = await user?.getIdToken()
      if (idToken) {
        setToken(idToken)
      } else {
        resetToken()
      }
      setCurrentUser(user)
    })
    return unsubscribe
  }, [resetToken, setToken])

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
