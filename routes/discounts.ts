import fastifyPlugin from 'fastify-plugin'
import { DiscountList } from '../types'

const discounts: DiscountList = {
  orange: {
    amount: 1,
    count: 2,
    deal: `Today's special: Buy 2 for $3.`,
  },
}

export default fastifyPlugin(async (fastify) => {
  fastify.get('/discounts', (req, reply) => {
    reply.send({ data: discounts })
  })
})
