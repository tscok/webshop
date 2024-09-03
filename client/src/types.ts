export type ProductName = 'coffee' | 'orange' | 'bread'

export type Product = { name: ProductName; price: number }

export type Discount = Product & { info: string; count: number }

export type ProductList = Record<ProductName, Product>

export type DiscountList = Partial<Record<ProductName, Discount>>

export type CartItem = Product & {
  count: number
  discount: number
  subtotal: number
}
