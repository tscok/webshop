export type ProductName = 'coffee' | 'orange' | 'bread'

export type Product = {
  name: ProductName
  price: number
  discount?: Discount
}

export type Discount = {
  amount: number
  count: number
  info: string
}

export type Cart = {
  count: number
  items: CartItem[]
  total: number
}

export type CartItem = {
  count: number
  discount: number
  name: ProductName
  price: number
}

export type RequestBody<T extends unknown> = { data: T }

export type User = { id: string; name: string }
