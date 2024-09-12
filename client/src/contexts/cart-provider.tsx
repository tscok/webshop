import { createContext, PropsWithChildren, useCallback } from 'react'
import { CartItem, ProductName } from '../../../types'
import { useCartItems } from '../hooks/use-cart-items'
import cartClient from '../api/cart-client'
import useQuery from '../hooks/use-query'

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
  const queryCallback = useCallback(async () => await cartClient.getCart(), [])
  const { data = [], refetch } = useQuery(queryCallback)
  const items = useCartItems(data)

  const handleAdd = async (name: ProductName) => {
    await cartClient.addItem(name)
    refetch()
  }

  const handleRemove = async (name: ProductName) => {
    await cartClient.removeItem(name)
    refetch()
  }

  const value = {
    items,
    onAdd: handleAdd,
    onRemove: handleRemove,
    total: getCartTotal(items),
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
