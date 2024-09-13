export type Discount = { amount: number; count: number; deal: string }

export type DiscountList = Partial<Record<ProductName, Discount>>

export type Product = { name: ProductName; price: number }

export type ProductCount = Partial<Record<ProductName, number>>

export type ProductList = Record<ProductName, Product>

export type ProductName = 'coffee' | 'orange' | 'bread'

export type CartItem = Product & {
  count: number
  discount: number
}

export type Cart = {
  items: CartItem[]
  total: number
}

export type RequestBody = { data: ProductName }
