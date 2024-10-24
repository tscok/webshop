import { Cart, Product, ProductName, User } from '../../../types'
import Client from './client'

const client = new Client()

export default class Api {
  getCart() {
    return client.get<Cart>('/cart')
  }

  addCartItem(name: ProductName) {
    return client.post<ProductName>('/cart', name)
  }

  delCartItem(name: ProductName): Promise<ProductName> {
    return client.delete('/cart', name)
  }

  getProducts() {
    return client.get<Product[]>('/products')
  }

  getUser() {
    return client.get<User>('/auth/me')
  }

  login() {
    return Promise.resolve((window.location.href = '/auth/login'))
  }

  logout() {
    return client.get<void>('/auth/logout')
  }
}
