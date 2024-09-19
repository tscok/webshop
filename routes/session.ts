import { FastifyPluginCallback } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

// extends Session object with `user`
declare module 'fastify' {
  interface Session {
    user: { name: string; role: string }
  }
}

// session handling mock
const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/session/get', (req, reply) => {
    const user = req.session.user
    reply.send(user ? { user } : { message: 'No session data found.' })
  })

  fastify.get('/session/set', (req, reply) => {
    req.session.user = { name: 'John Doe', role: 'admin' }
    reply.send({ message: 'Session data set!' })
  })

  fastify.get('/session/del', async (req, reply) => {
    try {
      await req.session.destroy()
      reply.send({ message: 'Session destroyed!' })
    } catch (e) {
      reply.status(500).send({ error: 'Failed to destroy session.' })
    }
  })

  done()
}

export default fastifyPlugin(pluginCallback)
