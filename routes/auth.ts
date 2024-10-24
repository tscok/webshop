import { FastifyPluginCallback, FastifyRequest } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { redisStore } from '../utils/redis-store'
import { COOKIE_NAME } from '../config'
import { getAuthenticatedUser, authUrl } from '../auth/google-auth'
import { User } from '../types'

function getUserIdFromCookie(request: FastifyRequest): string {
  return request.cookies[COOKIE_NAME] ?? ''
}

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/auth/me', async (request, reply) => {
    const userId = getUserIdFromCookie(request)
    const user = await redisStore.get<User>(userId)
    reply.send({ data: user })
  })

  /** Handle response from Google */
  fastify.get('/oauth2', async (request, reply) => {
    try {
      const { code } = request.query as { code: string }
      if (!code) throw new Error('invalid query param')
      const user = await getAuthenticatedUser(code)
      await redisStore.set(user.uid, user)
      reply.cookie(COOKIE_NAME, user.uid, { path: '/' })
      reply.redirect('/')
    } catch (e) {
      reply.status(403).send(e)
    }
  })

  /** Redirect to Google */
  fastify.get('/auth/login', (request, reply) => {
    reply.redirect(authUrl)
  })

  fastify.get('/auth/logout', async (request, reply) => {
    const userId = getUserIdFromCookie(request)
    await redisStore.destroy(userId)
    reply.clearCookie(COOKIE_NAME)
    reply.send({ data: 'OK' })
  })

  done()
}

export default fastifyPlugin(pluginCallback)
