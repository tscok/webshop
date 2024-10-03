import fastifyPlugin from 'fastify-plugin'
import fastifyRedis from '@fastify/redis'
import { FastifyPluginCallback } from 'fastify'
import { redisClient } from '../utils/redis-store'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(fastifyRedis, {
    client: redisClient,
    closeClient: true,
    lazyConnect: true,
  })

  done()
}

export default fastifyPlugin(pluginCallback)
