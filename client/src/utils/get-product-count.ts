import { Product, ProductName } from '../types'

// TODO: should be handled server-side
export function getProductCount(
  productNames: ProductName[],
  product: Product
): number {
  return productNames.reduce(
    (count, productName) => (productName === product.name ? count + 1 : count),
    0
  )
}
