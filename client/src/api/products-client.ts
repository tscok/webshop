import { Product } from '../../../types'
import ApiClient from './api-client'

class ProductsClient extends ApiClient {
  async getProducts(): Promise<Product[]> {
    return this.get('/products')
  }
}

export default new ProductsClient()
