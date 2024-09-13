import fastifyPlugin from 'fastify-plugin'
import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import { ProductName, RequestBody } from '../types'
import { getCart } from '../utils/get-cart'

const levelDb = (fastify: FastifyInstance, name: string) => ({
  get: async (): Promise<ProductName[]> => {
    const data = (await fastify.level.db.get(name)) as string
    return (data ? data.split(',') : []) as ProductName[]
  },
  set: async (data: ProductName[]): Promise<void> => {
    await fastify.level.db.put(name, data.toString())
  },
})

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  const db = levelDb(fastify, 'cart')

  fastify.get('/cart', async function (req, reply) {
    const data = await db.get()
    reply.send({ data: getCart(data) })
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
