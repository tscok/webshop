import { Cart, Product, ProductName, User } from '../../../types'
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

  getUser(): Promise<User> {
    return client.get('/auth/me')
  }

  login(username: string): Promise<string> {
    return client.post('/auth/login', username)
  }

  logout(): Promise<string> {
    return client.get('/auth/logout')
  }
}
