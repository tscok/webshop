import { FastifyPluginCallback } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { discounts } from '../data'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/discounts', (req, reply) => {
    reply.send({ data: discounts })
  })

  done()
}

export default fastifyPlugin(pluginCallback)
