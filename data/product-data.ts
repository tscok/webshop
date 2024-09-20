import { Product } from '../types'

const productData: Product[] = [
  { name: 'coffee', price: 1 },
  {
    name: 'orange',
    price: 2,
    discount: {
      amount: 1,
      count: 2,
      info: "Today's special: Buy 2 for $3.",
    },
  },
  { name: 'bread', price: 3 },
]

export default productData
