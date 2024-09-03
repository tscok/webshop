import { CartItem } from '../types'

export function getTotalCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.subtotal, 0)
}

export function getItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.count, 0)
}
