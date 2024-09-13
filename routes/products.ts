import { FastifyPluginCallback } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { products } from '../data'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/products', (req, reply) => {
    reply.send({ data: products })
  })

  done()
}

export default fastifyPlugin(pluginCallback)
