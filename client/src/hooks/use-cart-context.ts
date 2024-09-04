import { useContext } from 'react'
import { CartContext } from '../contexts/cart-provider'

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used with CartProvider')
  }
  return context
}
