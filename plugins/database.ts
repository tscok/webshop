import { fastifyLeveldb } from '@fastify/leveldb'
import { FastifyPluginCallback } from 'fastify'
import { ROOT_PATH } from '../config'
import fastifyPlugin from 'fastify-plugin'
import path from 'path'

const pluginCallback: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(fastifyLeveldb, {
    name: 'db',
    path: path.join(ROOT_PATH, 'database'),
  })

  done()
}

export default fastifyPlugin(pluginCallback)
