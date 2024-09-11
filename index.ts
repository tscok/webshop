import Fastify from 'fastify'
import plugins from './plugins'
import routes from './routes'

const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'

const fastify = Fastify()

fastify.register(plugins.session)
fastify.register(plugins.client)

fastify.register(routes.cart)
fastify.register(routes.discounts)
fastify.register(routes.products)

fastify.listen({ port: 3000, host: HOST }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server is now listening on ${address}`)
})
