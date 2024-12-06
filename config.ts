import 'dotenv/config'
import path from 'path'

function env(key: string): string {
  const value = process.env[key]
  if (value === undefined) {
    throw new Error(`Env variable "${key}" not found`)
  }
  return value
}

export const ROOT_PATH = path.join(__dirname)

export const SESSION_SECRET = env('SESSION_SECRET')
export const SESSION_TTL = 1000 * 60 * 60 * 24 // 24 hours

export const COOKIE_NAME = 'session-id'

export const FRONTEND_URL = 'https://localhost:3000/'

export const GOOGLE_CLIENT_ID = env('GOOGLE_OIDC_CLIENT_ID')
export const GOOGLE_CLIENT_SECRET = env('GOOGLE_OIDC_CLIENT_SECRET')

export const FIREBASE_CONFIG = {
  apiKey: env('FIREBASE_API_KEY'),
  authDomain: env('FIREBASE_AUTH_DOMAIN'),
  projectId: env('FIREBASE_PROJECT_ID'),
  storageBucket: env('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: env('FIREBASE_MESSAGING_SENDER_ID'),
  appId: env('FIREBASE_APP_ID'),
}

export const FIREBASE_SERVICE_ACCOUNT_BASE64 = env(
  'FIREBASE_SERVICE_ACCOUNT_BASE64'
)
