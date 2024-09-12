import 'dotenv/config'
import Fastify from 'fastify'
import plugins from './plugins'
import routes from './routes'

const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'

const fastify = Fastify({ logger: true })

fastify.register(plugins.session)
fastify.register(plugins.client)
fastify.register(plugins.database)

fastify.register(routes.cart)
fastify.register(routes.discounts)
fastify.register(routes.products)

async function start() {
  try {
    await fastify.listen({ port: 3000, host: HOST })
    // start with empty `cart`
    await fastify.level.db.put('cart', '')
    fastify.log.info(`Server is now listening on ${HOST}`)
  } catch (error) {
    if (error) {
      fastify.log.error(error)
      process.exit(1)
    }
  }
}

start()
