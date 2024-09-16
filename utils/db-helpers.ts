import { FastifyInstance } from 'fastify'
import { ProductName } from '../types'

export const dbHelpers = (fastify: FastifyInstance, name: string) => ({
  get: async (): Promise<ProductName[]> => {
    const data = (await fastify.level.db.get(name)) as string
    return (data ? data.split(',') : []) as ProductName[]
  },
  set: async (data: ProductName[]): Promise<void> => {
    await fastify.level.db.put(name, data.toString())
  },
})
