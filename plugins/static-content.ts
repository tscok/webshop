import fastifyPlugin from 'fastify-plugin'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { ROOT_PATH } from '../config'

const DIST = process.env.NODE_ENV === 'production' ? '' : 'dist'

export const FILE_NAME = 'index.html'

export default fastifyPlugin(async (fastify) => {
  await fastify.register(fastifyStatic, {
    root: path.join(ROOT_PATH, DIST, 'client'),
  })
})
