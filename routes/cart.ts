import { FastifyPluginCallback } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/cart', (req, reply) => {
    reply.send({ data: [] })
  })

  fastify.post('/cart', (req, reply) => {
    reply.send(req.body)
  })

  fastify.delete('/cart', (req, reply) => {
    reply.send(req.body)
  })

  done()
}

export default fastifyPlugin(pluginCallback)
