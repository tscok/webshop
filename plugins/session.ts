import 'dotenv/config'
import { fastifySession, SessionStore } from '@fastify/session'
import { fastifyCookie } from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyPlugin from 'fastify-plugin'
import sessionFileStore from 'session-file-store'
import { SESSION_KEY, SESSION_TTL } from '../config'
import { FastifyPluginCallback } from 'fastify'

type FileStoreType = { new (params?: Record<string, unknown>): SessionStore }
const FileStore: FileStoreType = sessionFileStore(fastifySession)

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  // fastifyCookies is required by fastifySession
  fastify.register(fastifyCookie)

  // session handling
  fastify.register(fastifySession, {
    cookie: { maxAge: SESSION_TTL },
    secret: SESSION_KEY,
    store: new FileStore({ path: './sessions' }),
  })

  // fastifyCors is required to allow cookies on client
  fastify.register(fastifyCors, {
    methods: ['GET', 'POST', 'DELETE'],
  })

  done()
}

export default fastifyPlugin(pluginCallback)
