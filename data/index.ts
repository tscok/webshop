import { DiscountList, ProductList } from '../types'

export const discounts: DiscountList = {
  orange: {
    amount: 1,
    count: 2,
    deal: `Today's special: Buy 2 for $3.`,
  },
}

export const products: ProductList = {
  coffee: { name: 'coffee', price: 1 },
  orange: { name: 'orange', price: 2 },
  bread: { name: 'bread', price: 3 },
}
