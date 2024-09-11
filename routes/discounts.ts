import fastifyPlugin from 'fastify-plugin'
import { DiscountList } from '../types'
import { FastifyPluginCallback } from 'fastify'

const discounts: DiscountList = {
  orange: {
    amount: 1,
    count: 2,
    deal: `Today's special: Buy 2 for $3.`,
  },
}

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/discounts', (req, reply) => {
    reply.send({ data: discounts })
  })

  done()
}

export default fastifyPlugin(pluginCallback)
