import { FastifyPluginCallback } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { verifyIdToken } from '../firebase'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post(
    '/api/firebase/verify',
    { preHandler: verifyIdToken },
    (request, reply) => {
      reply.status(200).send({ data: 'OK' })
    }
  )

  done()
}

export default fastifyPlugin(pluginCallback)
