import { FastifyRequest } from 'fastify'
import { redisStore, RedisStoreType } from './redis-store'
import { User } from '../types'
import { COOKIE_NAME } from '../config'

declare module 'fastify' {
  interface FastifyRequest {
    user: User | null
  }
}

interface UserStoreType {
  getSessionId(request: FastifyRequest): string | undefined
  get(request: FastifyRequest): Promise<User | null>
  create(request: FastifyRequest, userName?: string): Promise<User>
  remove(request: FastifyRequest): Promise<void>
}

class UserStore implements UserStoreType {
  private store: RedisStoreType

  constructor(redisStore: RedisStoreType) {
    this.store = redisStore
  }

  getSessionId(request: FastifyRequest) {
    return request.cookies[COOKIE_NAME]
  }

  async get(request: FastifyRequest) {
    const sessionId = this.getSessionId(request)
    if (!sessionId) return null
    return await this.store.get<User>(sessionId)
  }

  async create(request: FastifyRequest, userName: string = 'Guest') {
    const currentUser = await this.get(request)
    if (currentUser) return currentUser

    const sessionId = `sess:${request.session.sessionId}`
    const user: User = { id: sessionId, name: userName }
    await this.store.set(sessionId, user)
    return user
  }

  async remove(request: FastifyRequest) {
    const sessionId = this.getSessionId(request)
    if (sessionId) await this.store.destroy(sessionId)
  }
}

export const userStore = new UserStore(redisStore)
