import Fastify, { FastifyInstance } from 'fastify'
import pem from 'pem'

type FastifyOptions = {
  trustProxy?: boolean
  https?: {
    cert: string
    key: string
  }
}

export const getHttpsServer = () =>
  new Promise<FastifyInstance>((resolve, reject) => {
    /* Requires openssl -> https://www.npmjs.com/package/pem */
    pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
      if (err) {
        reject(err)
      }

      let options: FastifyOptions = {
        https: { cert: keys.certificate, key: keys.clientKey },
      }

      if (process.env.NODE_ENV === 'production') {
        options = { trustProxy: true }
      }

      const server = Fastify({ logger: true, ...options })

      resolve(server)
    })
  })
