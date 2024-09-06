import fastifyPlugin from 'fastify-plugin'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { ROOT_PATH } from '../config'

export default fastifyPlugin(async (fastify) => {
  const DIST = process.env.NODE_ENV === 'production' ? '' : 'dist'

  await fastify.register(fastifyStatic, {
    root: path.join(ROOT_PATH, DIST, 'client'),
  })

  fastify.get('/', (_, reply) => reply.sendFile('index.html'))
})
