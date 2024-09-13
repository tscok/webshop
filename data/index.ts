import { Discount, Product, ProductName } from '../types'

export const discounts: Discount[] = [
  {
    amount: 1,
    count: 2,
    deal: `Today's special: Buy 2 for $3.`,
    productName: 'orange',
  },
]

export const products: Product[] = [
  { name: 'coffee', price: 1 },
  { name: 'orange', price: 2 },
  { name: 'bread', price: 3 },
]
