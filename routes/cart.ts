import { FastifyPluginCallback } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/cart', async function (req, reply) {
    const data = (await this.level.db.get('cart')) as string
    const cart = data ? data.split(',') : []
    reply.send({ data: cart })
  })

  fastify.post('/cart', async function (req, reply) {
    const payload = JSON.parse(req.body as string) as { data: string }
    const data = (await this.level.db.get('cart')) as string
    const cart = data ? [...data.split(','), payload.data] : [payload.data]
    await fastify.level.db.put('cart', cart.toString())
    reply.send(req.body)
  })

  fastify.delete('/cart', async function (req, reply) {
    const payload = JSON.parse(req.body as string) as { data: string }
    const data = (await this.level.db.get('cart')) as string
    const cart = data ? data.split(',') : []
    const newCart = cart.toSpliced(cart.lastIndexOf(payload.data), 1)
    await fastify.level.db.put('cart', newCart.toString())
    reply.send(req.body)
  })

  done()
}

export default fastifyPlugin(pluginCallback)
