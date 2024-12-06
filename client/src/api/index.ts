import { Cart, Product, ProductName } from '../../../types'
import Client from './client'

export default class Api extends Client {
  constructor(token?: string) {
    super(token)
  }

  getCart = (): Promise<Cart> => {
    return this.get('/cart')
  }

  addCartItem = (name: ProductName): Promise<ProductName> => {
    return this.post('/cart', name)
  }

  delCartItem = (name: ProductName): Promise<ProductName> => {
    return this.delete('/cart', name)
  }

  getProducts = (): Promise<Product[]> => {
    return this.get('/products')
  }

  verifyUser = (): Promise<string> => {
    return this.post('/api/firebase/verify')
  }
}
