import { Cart, Product, ProductName } from '../../../types'
import Client from './client'

const client = new Client()

export default class Api {
  getCart(): Promise<Cart> {
    return client.get('/cart')
  }

  addCartItem(name: ProductName): Promise<ProductName> {
    return client.post('/cart', name)
  }

  delCartItem(name: ProductName): Promise<ProductName> {
    return client.delete('/cart', name)
  }

  getProducts(): Promise<Product[]> {
    return client.get('/products')
  }
}
