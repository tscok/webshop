import { FastifyPluginCallback } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { userStore } from '../utils/user-store'
import { COOKIE_NAME } from '../config'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/auth/me', async (request, reply) => {
    const currentUser = await userStore.get(request)
    reply.send(currentUser)
  })

  fastify.get('/auth/login', async (request, reply) => {
    const user = await userStore.create(request)
    reply.cookie(COOKIE_NAME, user.id, { path: '/' })
    reply.redirect('/')
  })

  fastify.get('/auth/logout', async (request, reply) => {
    await userStore.remove(request)
    reply.cookie(COOKIE_NAME, '', { path: '/' })
    reply.redirect('/')
  })

  done()
}

export default fastifyPlugin(pluginCallback)
