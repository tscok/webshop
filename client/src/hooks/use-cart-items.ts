import { CartItem, ProductName } from '../types'
import { getDiscount } from '../utils/get-discount'
import { getProductCount } from '../utils/get-product-count'
import { useDiscounts } from './use-discounts'
import { useProducts } from './use-products'

// TODO: move calculations to server
export function useCartItems(productNames: ProductName[]): CartItem[] {
  const products = useProducts()
  const discounts = useDiscounts()

  return [...new Set(productNames)].map((productName) => {
    const product = products[productName]
    const count = getProductCount(productNames, product)
    const discount = getDiscount(product, count, discounts[product.name])
    return {
      ...product,
      count,
      discount,
      subtotal: product.price * count - discount,
    }
  })
}
