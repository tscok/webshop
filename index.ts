import fastify from 'fastify'
import staticContent, { FILE_NAME } from './plugins/static-content'

const server = fastify()

server.register(staticContent)

server.get('/', (_, reply) => reply.sendFile(FILE_NAME))

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
