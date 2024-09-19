import fastifySession from '@fastify/session'
import { fastifyCookie } from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyPlugin from 'fastify-plugin'
import { SESSION_KEY, SESSION_TTL } from '../config'
import { redisStore } from './redis'
import { FastifyPluginCallback } from 'fastify'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  // fastifyCookie is required by fastifySession
  fastify.register(fastifyCookie)

  // session handling
  fastify.register(fastifySession, {
    cookie: { maxAge: SESSION_TTL, secure: false },
    secret: SESSION_KEY,
    store: redisStore,
    saveUninitialized: false,
  })

  // fastifyCors is required to allow cookies on client
  fastify.register(fastifyCors, {
    methods: ['GET', 'POST', 'DELETE'],
  })

  done()
}

export default fastifyPlugin(pluginCallback)
