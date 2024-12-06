import { initializeApp, FirebaseError } from 'firebase/app'
import * as firebase from 'firebase/auth'
import { FIREBASE_CONFIG } from '../../config'
import type { User, Unsubscribe, NextOrObserver } from 'firebase/auth'
import { getErrorMessage } from '../utils/get-error-message'
import type { AuthForm } from '../types'

const app = initializeApp(FIREBASE_CONFIG)
const auth = firebase.getAuth(app)

export type { User } from 'firebase/auth'

export const TOKEN_NAME = 'firebase:authUser:idToken'

const getPersistence = (persist: boolean) =>
  persist ? firebase.browserSessionPersistence : firebase.inMemoryPersistence

export const signIn = async (form: AuthForm): Promise<void> => {
  await firebase.setPersistence(auth, getPersistence(form.persistence))
  await firebase.signInWithEmailAndPassword(auth, form.email, form.password)
}

export const signUp = async (form: AuthForm): Promise<void> => {
  await firebase.setPersistence(auth, getPersistence(form.persistence))
  const { user } = await firebase.createUserWithEmailAndPassword(
    auth,
    form.email,
    form.password
  )
  await firebase.sendEmailVerification(user)
}

export const signOut = async (): Promise<void> => {
  await firebase.signOut(auth)
}

export const resetPassword = async (email: string) => {
  await firebase.sendPasswordResetEmail(auth, email)
}

export const authObserver = (callback: NextOrObserver<User>): Unsubscribe =>
  firebase.onAuthStateChanged(auth, callback)

export const error = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-email':
      case 'auth/invalid-credential':
        return 'Unable to sign in. Please check your credentials.'
      case 'auth/email-already-in-use':
        return 'Unable to sign up. Please check your credentials.'
      case 'auth/weak-password':
        return 'Unable to sign up. Please pick a stronger password.'
      default:
        return error.code
    }
  }
  return getErrorMessage(error)
}

type Key = 'password-reset' | 'sign-up' | 'sign-in'
export const info = (key: Key, email: string) => {
  switch (key) {
    case 'sign-in':
      return `You are logged in as ${email}`
    case 'sign-up':
      return `Account created! Confirmation sent to ${email}`
    case 'password-reset':
      return `Password reset instructions sent to ${email}`
  }
}
