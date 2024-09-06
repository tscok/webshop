import { createContext, PropsWithChildren, useState } from 'react'
import { CartItem, ProductName } from '../../../types'
import { useCartItems } from '../hooks/use-cart-items'
import cartClient from '../api/cart-client'
import { getErrorMessage } from '../api/get-error-message'

type CartType = {
  items: CartItem[]
  onAdd: (name: ProductName) => void
  onRemove: (name: ProductName) => void
  total: number
}

// TODO: move calculation to server
function getCartTotal(items: CartItem[]): number {
  return items.reduce(
    (total, item) => total + (item.count * item.price - item.discount),
    0
  )
}

export const CartContext = createContext<CartType>({} as CartType)

export const CartProvider = ({ children }: PropsWithChildren) => {
  // TODO: store data on server
  const [cart, setCart] = useState<ProductName[]>([])

  // TODO: fetch cart data from server
  const items = useCartItems(cart)

  const handleAdd = async (name: ProductName) => {
    // TODO: handle changes on server
    setCart((prev) => [...prev, name])

    try {
      await cartClient.addItem(name)
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  const handleRemove = async (name: ProductName) => {
    // TODO: handle changes on server
    setCart((prev) => {
      const lastIndexOfName = prev.lastIndexOf(name)
      // returns copy of `prev` without last occurrence of `name`
      return prev.toSpliced(lastIndexOfName, 1)
    })

    try {
      await cartClient.removeItem(name)
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  }

  const value = {
    items,
    onAdd: handleAdd,
    onRemove: handleRemove,
    total: getCartTotal(items),
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
