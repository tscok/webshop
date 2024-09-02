import fastify from 'fastify'

const server = fastify()

server.get('/ping', () => 'pong\n')

server.listen({ host: 'localhost', port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
