import 'dotenv/config'
import Fastify from 'fastify'
import plugins from './plugins'
import routes from './routes'
import { dbHelpers } from './utils/db-helpers'
import { ProductName } from './types'

const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'

const fastify = Fastify({ logger: true })

fastify.register(plugins.redis)
fastify.register(plugins.session)
fastify.register(plugins.client)
fastify.register(plugins.database)

fastify.register(routes.auth)
fastify.register(routes.cart)
fastify.register(routes.products)

async function start() {
  const db = dbHelpers(fastify)
  try {
    await fastify.listen({ port: 3000, host: HOST })
    await db.set<ProductName[]>('cart', [])
    fastify.log.info(`Server is now listening on ${HOST}`)
  } catch (error) {
    if (error) {
      fastify.log.error(error)
      process.exit(1)
    }
  }
}

start()
