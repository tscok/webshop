import fastifyPlugin from 'fastify-plugin'
import fastifyRedis from '@fastify/redis'
import { FastifyPluginCallback } from 'fastify'
import { Redis, Callback } from 'ioredis'

export const redisClient = new Redis({ host: 'localhost', port: 6379 })

export const redisStore = {
  get: async (sessionId: string, callback: Callback) => {
    await redisClient.get(`sess:${sessionId}`, (err, result) => {
      if (err) return callback(err)
      callback(null, result ? JSON.parse(result) : null)
    })
  },
  set: async (sessionId: string, session: unknown, callback: Callback) => {
    await redisClient.set(
      `sess:${sessionId}`,
      JSON.stringify(session),
      'EX',
      86400,
      callback
    )
  },
  destroy: async (sessionId: string, callback: Callback) => {
    await redisClient.del(`sess:${sessionId}`, callback)
  },
}

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(fastifyRedis, {
    client: redisClient,
    closeClient: true,
    lazyConnect: true,
  })

  done()
}

export default fastifyPlugin(pluginCallback)
