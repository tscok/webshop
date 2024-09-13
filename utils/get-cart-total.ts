import { CartItem } from '../types'

export const getCartTotal = (items: CartItem[]): number =>
  items.reduce(
    (total, item) => total + (item.count * item.price - item.discount),
    0
  )
