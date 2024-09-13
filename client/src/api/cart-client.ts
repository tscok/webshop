import { Cart, ProductName } from '../../../types'
import ApiClient from './api-client'

class CartClient extends ApiClient {
  async getCart(): Promise<Cart> {
    return this.get('/cart')
  }

  async addItem(name: ProductName): Promise<ProductName> {
    return this.post('/cart', { data: name })
  }

  async removeItem(name: ProductName): Promise<ProductName> {
    return this.delete('/cart', { data: name })
  }
}

export default new CartClient()
