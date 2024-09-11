import fastifyPlugin from 'fastify-plugin'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { ROOT_PATH } from '../config'
import { FastifyPluginCallback } from 'fastify'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  const DIST = process.env.NODE_ENV === 'production' ? '' : 'dist'

  fastify.register(fastifyStatic, {
    root: path.join(ROOT_PATH, DIST, 'client'),
  })

  fastify.get('/', (_, reply) => reply.sendFile('index.html'))

  done()
}

export default fastifyPlugin(pluginCallback)
