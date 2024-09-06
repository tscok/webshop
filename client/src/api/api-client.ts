import { getErrorMessage } from './get-error-message'

export default class ApiClient {
  async makeRequest(
    path: string,
    method: 'GET' | 'POST' | 'DELETE',
    body?: unknown
  ) {
    try {
      const response = await fetch(
        new Request(path, { method, body: JSON.stringify(body) })
      )
      const { data } = await response.json()
      return data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  get(path: string) {
    return this.makeRequest(path, 'GET')
  }

  post(path: string, body?: unknown) {
    return this.makeRequest(path, 'POST', body)
  }

  delete(path: string, body?: unknown) {
    return this.makeRequest(path, 'DELETE', body)
  }
}
