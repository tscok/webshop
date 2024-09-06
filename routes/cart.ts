import fastifyPlugin from 'fastify-plugin'

export default fastifyPlugin(async (fastify) => {
  fastify.get('/cart', (req, reply) => {
    reply.send({ data: [] })
  })

  fastify.post('/cart', (req, reply) => {
    reply.send(req.body)
  })

  fastify.delete('/cart', (req, reply) => {
    reply.send(req.body)
  })
})
