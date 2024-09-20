import { FastifyInstance } from 'fastify'

export const dbHelpers = (fastify: FastifyInstance) => ({
  get: async <T extends unknown>(name: string, defaultValue: T): Promise<T> => {
    const data = (await fastify.level.db.get(name)) as string
    return data ? JSON.parse(data) : defaultValue
  },
  set: async <T extends unknown>(name: string, data: T): Promise<void> => {
    await fastify.level.db.put(name, JSON.stringify(data))
  },
})
