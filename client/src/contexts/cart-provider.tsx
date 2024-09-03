import { createContext, PropsWithChildren, useState } from 'react'
import { CartItem, ProductName } from '../types'
import { useCartItems } from '../hooks/use-cart-items'
import { getTotalCount } from '../utils/cart-counts'
import { addNumberOfX, removeNumberOfX } from '../utils/from-array'

type CartType = {
  items: CartItem[]
  onAdd: (name: ProductName) => void
  onRemove: (name: ProductName) => void
  total: number
}

export const CartContext = createContext<CartType>({} as CartType)

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<ProductName[]>([])

  // TODO: fetch data from server
  const items = useCartItems(cart)

  const handleAdd = (name: ProductName) => {
    // TODO: implement server action
    setCart((prev) => addNumberOfX(1, name, prev))
  }

  const handleRemove = (name: ProductName) => {
    // TODO: implement server action
    setCart((prev) => removeNumberOfX(1, name, prev))
  }

  const value = {
    items,
    onAdd: handleAdd,
    onRemove: handleRemove,
    total: getTotalCount(items),
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
