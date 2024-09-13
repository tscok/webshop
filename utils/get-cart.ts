import { discounts, products } from '../data'
import { Cart, ProductName } from '../types'
import { getProductCount } from './get-product-count'
import { getCartTotal } from './get-cart-total'

const DEFAULT_CART: Cart = { items: [], total: 0 }

export function getCart(productNames: ProductName[]): Cart {
  if (!discounts || !products) return DEFAULT_CART

  const productCount = getProductCount(productNames)

  const items = [...new Set(productNames)].map((productName) => {
    const product = products[productName]
    const count = productCount[productName] ?? 1
    const discount = discounts[product.name]

    return {
      ...product,
      count,
      discount: discount && count >= discount.count ? discount.amount : 0,
    }
  })

  return {
    items,
    total: getCartTotal(items),
  }
}
