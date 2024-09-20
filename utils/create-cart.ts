import { Cart, CartItem, Discount, Product, ProductName } from '../types'
import { productMap } from '../data'

const getDiscount = (productCount: number, productDiscount?: Discount) => {
  if (!productDiscount || productDiscount.count > productCount) return 0
  return productDiscount.amount
}

const getSubTotal = (item: CartItem) => {
  return item.count * item.price - item.discount
}

const getTotal = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + getSubTotal(item), 0)
}

const getCartItemsMap = (productNames: ProductName[]) => {
  return productNames.reduce((map, name) => {
    const count = (map.get(name)?.count ?? 0) + 1
    const product = productMap.get(name) as Product
    const discount = getDiscount(count, product.discount)
    return map.set(name, { ...product, count, discount })
  }, new Map<ProductName, CartItem>())
}

export const createCart = (productNames: ProductName[]): Cart => {
  const cartItemsMap = getCartItemsMap(productNames)
  const items = Array.from(cartItemsMap.values())

  return {
    count: productNames.length,
    items,
    total: getTotal(items),
  }
}
