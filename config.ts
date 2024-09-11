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

export const SESSION_KEY = env('SESSION_KEY')
export const SESSION_TTL = 1000 * 60 * 60 * 24 // 24 hours

export const FRONTEND_URL = 'http://localhost:3000'
