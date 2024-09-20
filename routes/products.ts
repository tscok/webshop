import { FastifyPluginCallback } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { productMap } from '../data'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/products', (req, reply) => {
    reply.send({ data: Array.from(productMap.values()) })
  })

  done()
}

export default fastifyPlugin(pluginCallback)
