import { OAuth2Client, TokenPayload } from 'google-auth-library'
import { decode } from 'jsonwebtoken'
import { getErrorMessage } from '../utils/error-message'
import * as config from '../config'
import { User } from '../types'

const authClient = new OAuth2Client(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  'https://localhost:3000/oauth2'
)

export const authUrl = authClient.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  response_type: 'code',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
})

export async function getAuthenticatedUser(code: string): Promise<User> {
  try {
    const { tokens } = await authClient.getToken(code)

    if (typeof tokens.id_token !== 'string') {
      throw new Error('invalid auth tokens')
    }

    authClient.setCredentials(tokens)
    const payload = <TokenPayload>decode(tokens.id_token)

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      uid: payload.sub,
    }
  } catch (e) {
    throw new Error(getErrorMessage(e))
  }
}
