import { FastifyPluginCallback, FastifyRequest } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { redisStore } from '../utils/redis-store'
import { COOKIE_NAME } from '../config'
import { RequestBody, User } from '../types'

function getSessionId(request: FastifyRequest): string {
  return request.cookies[COOKIE_NAME] ?? ''
}

function getUserData(request: FastifyRequest): User {
  const payload = JSON.parse(request.body as string) as RequestBody<string>
  return {
    id: `sess:${request.session.sessionId}`,
    name: payload.data,
  }
}

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/auth/me', async (request, reply) => {
    const sessionId = getSessionId(request)
    const currentUser = await redisStore.get(sessionId)
    reply.send({ data: currentUser })
  })

  fastify.post('/auth/login', async (request, reply) => {
    const sessionId = getSessionId(request)
    if (sessionId) return reply.send({ data: 'OK' })

    const user = getUserData(request)
    const status = await redisStore.set(user.id, user)
    reply.cookie(COOKIE_NAME, user.id, { path: '/' })
    reply.send({ data: status })
  })

  fastify.get('/auth/logout', async (request, reply) => {
    const sessionId = getSessionId(request)
    if (!sessionId) return reply.send({ data: 'OK' })

    await redisStore.destroy(sessionId)
    reply.cookie(COOKIE_NAME, '', { path: '/' })
    reply.send({ data: 'OK' })
  })

  done()
}

export default fastifyPlugin(pluginCallback)
