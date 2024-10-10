import { RequestBody } from '../../../types'

type METHOD = 'DELETE' | 'GET' | 'POST'

export default class Client {
  private getRequestInit<T>(method: METHOD, data?: T): RequestInit {
    if (!data) return { method }
    return { method, body: JSON.stringify({ data }) }
  }

  private getPath(path: string): string {
    if (process.env.NODE_ENV === 'production') return path
    return `http://localhost:3000${path}`
  }

  private makeRequest = async <T>(path: string, init: RequestInit) => {
    const response = await fetch(this.getPath(path), init)
    const json = (await response.json()) as RequestBody<T>
    return json.data
  }

  // Uses arrow functions to get `this` working as expected
  // https://www.typescriptlang.org/docs/handbook/2/classes.html#arrow-functions
  get = async <T>(path: string) => {
    return this.makeRequest<T>(path, { method: 'GET' })
  }

  post = async <T>(path: string, data: T) => {
    const init = this.getRequestInit<T>('POST', data)
    return this.makeRequest<T>(path, init)
  }

  delete = async <T>(path: string, data: T) => {
    const init = this.getRequestInit<T>('DELETE', data)
    return this.makeRequest<T>(path, init)
  }
}
