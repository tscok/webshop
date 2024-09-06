import { CartItem, ProductName } from '../../../types'
import { useDiscounts } from './use-discounts'
import { useProducts } from './use-products'

type ProductCount = Partial<Record<ProductName, number>>

function getProductCount(productNames: ProductName[]): ProductCount {
  return productNames.reduce<ProductCount>(
    (prev, name) => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }),
    {}
  )
}

// TODO: move calculations to server
export function useCartItems(productNames: ProductName[]): CartItem[] {
  const products = useProducts()
  const discounts = useDiscounts()

  if (!products || !discounts) return []

  const productCount = getProductCount(productNames)

  return [...new Set(productNames)].map((productName) => {
    const product = products[productName]
    const count = productCount[productName] ?? 1
    const discount = discounts[product.name]
    return {
      ...product,
      count,
      discount: discount && count >= discount.count ? discount.amount : 0,
    }
  })
}
