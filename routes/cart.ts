import fastifyPlugin from 'fastify-plugin'
import { FastifyPluginCallback } from 'fastify'
import { ProductName, RequestBody } from '../types'
import { createCart } from '../utils/create-cart'
import { dbHelpers } from '../utils/db-helpers'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  const db = dbHelpers(fastify)

  fastify.get('/cart', async function (req, reply) {
    const data = await db.get<ProductName[]>('cart', [])
    reply.send({ data: createCart(data) })
  })

  fastify.post('/cart', async function (req, reply) {
    const payload = JSON.parse(req.body as string) as RequestBody<ProductName>
    const data = await db.get<ProductName[]>('cart', [])
    await db.set('cart', [...data, payload.data])
    reply.send(req.body)
  })

  fastify.delete('/cart', async function (req, reply) {
    const payload = JSON.parse(req.body as string) as RequestBody<ProductName>
    const data = await db.get<ProductName[]>('cart', [])
    await db.set('cart', data.toSpliced(data.lastIndexOf(payload.data), 1))
    reply.send(req.body)
  })

  done()
}

export default fastifyPlugin(pluginCallback)
