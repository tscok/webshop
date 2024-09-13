import { createContext, PropsWithChildren, useCallback } from 'react'
import { Cart, CartItem, ProductName } from '../../../types'
import cartClient from '../api/cart-client'
import useQuery from '../hooks/use-query'

type CartType = {
  items: CartItem[]
  onAdd: (name: ProductName) => void
  onRemove: (name: ProductName) => void
  total: number
}

const DEFAULT_CART: Cart = { items: [], total: 0 }

export const CartContext = createContext<CartType>({} as CartType)

export const CartProvider = ({ children }: PropsWithChildren) => {
  const queryCallback = useCallback(async () => await cartClient.getCart(), [])
  const { data = DEFAULT_CART, refetch } = useQuery(queryCallback)

  const handleAdd = async (name: ProductName) => {
    await cartClient.addItem(name)
    refetch()
  }

  const handleRemove = async (name: ProductName) => {
    await cartClient.removeItem(name)
    refetch()
  }

  const value = {
    items: data.items,
    onAdd: handleAdd,
    onRemove: handleRemove,
    total: data.total,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
