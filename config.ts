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
