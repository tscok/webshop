import { ProductList } from '../types'

// TODO: fetch data from server
const productList: ProductList = {
  coffee: { name: 'coffee', price: 1 },
  orange: { name: 'orange', price: 2 },
  bread: { name: 'bread', price: 3 },
}

export function useProducts(): ProductList {
  return productList
}
