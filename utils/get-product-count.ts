import { ProductCount, ProductName } from '../types'

export const getProductCount = (productNames: ProductName[]): ProductCount =>
  productNames.reduce<ProductCount>(
    (prev, name) => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }),
    {}
  )
