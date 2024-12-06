import { getErrorMessage } from '../utils/get-error-message'

type METHOD = 'DELETE' | 'GET' | 'POST'

export default class Client {
  private token: string | undefined

  constructor(token?: string) {
    this.token = token
  }

  private async request(path: string, method: METHOD, body?: string) {
    const init: RequestInit = {
      body: body && JSON.stringify(body),
      headers: this.token ? { Authorization: this.token } : undefined,
      method,
    }

    try {
      const response = await fetch(path, init)
      if (!response.ok) throw new Error(response.statusText)
      const { data } = await response.json()
      return data
    } catch (error) {
      console.error(getErrorMessage(error))
      throw new Error(`${method} request to ${path} failed`)
    }
  }

  get(path: string) {
    return this.request(path, 'GET')
  }

  post(path: string, body?: string) {
    return this.request(path, 'POST', body)
  }

  delete(path: string, body?: string) {
    return this.request(path, 'DELETE', body)
  }
}
