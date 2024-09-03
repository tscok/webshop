import { Discount, Product } from '../types'

// TODO: should be handled server-side
export function getDiscount(
  product: Product,
  productCount: number,
  discount?: Discount
): number {
  if (!discount || discount.count > productCount) return 0
  const originalPrice = product.price * discount.count
  const discountPrice = discount.price * discount.count
  return originalPrice - discountPrice
}
