import { ProductList } from '../../../types'
import ApiClient from './api-client'

class ProductsClient extends ApiClient {
  async getProducts(): Promise<ProductList> {
    return this.get('/products')
  }
}

export default new ProductsClient()
