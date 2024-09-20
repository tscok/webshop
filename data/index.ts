import products from './product-data'
import { Product, ProductName } from '../types'

export const productMap = new Map<ProductName, Product>(
  products.map((p) => [p.name, p])
)
