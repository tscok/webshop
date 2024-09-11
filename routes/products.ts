import fastifyPlugin from 'fastify-plugin'
import { ProductList } from '../types'
import { FastifyPluginCallback } from 'fastify'

const products: ProductList = {
  coffee: { name: 'coffee', price: 1 },
  orange: { name: 'orange', price: 2 },
  bread: { name: 'bread', price: 3 },
}

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/products', (req, reply) => {
    reply.send({ data: products })
  })

  done()
}

export default fastifyPlugin(pluginCallback)
