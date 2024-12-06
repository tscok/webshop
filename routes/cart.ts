import fastifyPlugin from 'fastify-plugin'
import { FastifyPluginCallback } from 'fastify'
import { ProductName } from '../types'
import { createCart } from '../utils/create-cart'
import { dbHelpers } from '../utils/db-helpers'
import { jsonParse } from '../utils/json-parse'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  const db = dbHelpers(fastify)

  fastify.get('/cart', async function (req, reply) {
    const data = await db.get<ProductName[]>('cart', [])
    reply.send({ data: createCart(data) })
  })

  fastify.post('/cart', async function (req, reply) {
    const payload = jsonParse<ProductName>(req.body)
    const data = await db.get<ProductName[]>('cart', [])
    await db.set('cart', [...data, payload])
    reply.send(req.body)
  })

  fastify.delete('/cart', async function (req, reply) {
    const payload = jsonParse<ProductName>(req.body)
    const data = await db.get<ProductName[]>('cart', [])
    await db.set('cart', data.toSpliced(data.lastIndexOf(payload), 1))
    reply.send(req.body)
  })

  done()
}

export default fastifyPlugin(pluginCallback)
