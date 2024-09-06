import fastifyPlugin from 'fastify-plugin'
import { ProductList } from '../types'

const products: ProductList = {
  coffee: { name: 'coffee', price: 1 },
  orange: { name: 'orange', price: 2 },
  bread: { name: 'bread', price: 3 },
}

export default fastifyPlugin(async (fastify) => {
  fastify.get('/products', (req, reply) => {
    reply.send({ data: products })
  })
})
