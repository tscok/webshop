import fastifyPlugin from 'fastify-plugin'
import { FastifyPluginCallback } from 'fastify'
import { RequestBody } from '../types'
import { createCart } from '../utils/create-cart'
import { dbHelpers } from '../utils/db-helpers'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  const db = dbHelpers(fastify, 'cart')

  fastify.get('/cart', async function (req, reply) {
    const data = await db.get()
    reply.send({ data: createCart(data) })
  })

  fastify.post('/cart', async function (req, reply) {
    const payload = JSON.parse(req.body as string) as RequestBody
    const data = await db.get()
    await db.set([...data, payload.data])
    reply.send(req.body)
  })

  fastify.delete('/cart', async function (req, reply) {
    const payload = JSON.parse(req.body as string) as RequestBody
    const data = await db.get()
    await db.set(data.toSpliced(data.lastIndexOf(payload.data), 1))
    reply.send(req.body)
  })

  done()
}

export default fastifyPlugin(pluginCallback)
