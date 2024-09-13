export type Discount = {
  amount: number
  count: number
  deal: string
  productName: ProductName
}

export type DiscountList = Partial<Record<ProductName, Discount>>

export type Product = {
  name: ProductName
  price: number
  discount?: Discount
}

export type ProductCount = Partial<Record<ProductName, number>>

export type ProductList = Record<ProductName, Product>

export type ProductName = 'coffee' | 'orange' | 'bread'

export type CartItem = {
  count: number
  discount: number
  name: ProductName
  price: number
}

export type Cart = {
  items: CartItem[]
  total: number
}

export type RequestBody = { data: ProductName }
