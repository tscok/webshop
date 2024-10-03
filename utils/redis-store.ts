import { Redis } from 'ioredis'

export interface RedisStoreType {
  get: <T extends unknown>(key: string) => Promise<T | null>
  set: <T extends unknown>(key: string, session: T) => Promise<'OK'>
  destroy: (key: string) => Promise<number>
}

export const redisClient = new Redis({ host: 'localhost', port: 6379 })

class RedisStore implements RedisStoreType {
  private redis: Redis

  constructor(redisClient: Redis) {
    this.redis = redisClient
  }

  async get<T extends unknown>(key: string) {
    const result = await this.redis.get(key)
    return result ? (JSON.parse(result) as T) : null
  }

  async set<T extends unknown>(key: string, value: T) {
    return await this.redis.set(key, JSON.stringify(value), 'EX', 86400)
  }

  async destroy(key: string) {
    return await this.redis.del(key)
  }
}

export const redisStore = new RedisStore(redisClient)
