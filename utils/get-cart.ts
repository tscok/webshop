import { Cart, CartItem, Product, ProductName } from '../types'
import { getProductCount } from './get-product-count'
import { getCartTotal } from './get-cart-total'
import { productMap } from './product-map'

export function getCart(productNames: ProductName[]): Cart {
  const productCount = getProductCount(productNames)

  const items = [...new Set(productNames)].map<CartItem>((productName) => {
    const { discount, ...product } = productMap.get(productName) as Product
    const count = productCount[productName] ?? 1

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
