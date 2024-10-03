import fastifySession from '@fastify/session'
import { fastifyCookie } from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyPlugin from 'fastify-plugin'
import { FastifyPluginCallback } from 'fastify'
import { redisStore } from '../utils/redis-store'
import { SESSION_SECRET, SESSION_TTL } from '../config'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  // fastifyCookie is required by fastifySession
  fastify.register(fastifyCookie)

  // session handling
  fastify.register(fastifySession, {
    cookie: {
      maxAge: SESSION_TTL,
      sameSite: 'none',
      secure: 'auto',
      path: '/',
    },
    secret: SESSION_SECRET,
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
