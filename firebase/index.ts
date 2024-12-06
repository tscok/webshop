import firebaseAdmin from 'firebase-admin'
import type { ServiceAccount } from 'firebase-admin'
import type {
  FastifyRequest,
  FastifyReply,
  HookHandlerDoneFunction,
} from 'fastify'
import { FIREBASE_SERVICE_ACCOUNT_BASE64 } from '../config'
import { decode } from '../utils/base64'

const serviceAccount = decode<ServiceAccount>(FIREBASE_SERVICE_ACCOUNT_BASE64)

const firebase = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
})

export async function verifyIdToken(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  try {
    const idToken = request.headers.authorization
    if (!idToken) {
      return reply.status(400).send({ data: 'No token provided' })
    }
    const decodedIdToken = await firebase.auth().verifyIdToken(idToken)
    console.log('-- VERIFIED --', decodedIdToken)
    done()
  } catch (e) {
    reply.status(401).send({ data: 'Unauthorized' })
  }
}
