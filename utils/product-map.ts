import { discounts, products } from '../data'
import { Product, ProductName } from '../types'

export const productMap = new Map<ProductName, Product>(
  products.map((product) => {
    const discount = discounts.find((d) => d.productName === product.name)
    return [product.name, { ...product, discount }]
  })
)
