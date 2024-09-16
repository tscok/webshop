import { createContext, PropsWithChildren, useCallback } from 'react'
import { Cart, ProductName } from '../../../types'
import cartClient from '../api/cart-client'
import useQuery from '../hooks/use-query'

type CartType = {
  cart: Cart
  onAdd: (name: ProductName) => Promise<void>
  onRemove: (name: ProductName) => Promise<void>
}

const DEFAULT_DATA: Cart = { count: 0, items: [], total: 0 }

export const CartContext = createContext<CartType>({} as CartType)

export const CartProvider = ({ children }: PropsWithChildren) => {
  const { data: cart = DEFAULT_DATA, refetch } = useQuery(
    useCallback(async () => await cartClient.getCart(), [])
  )

  const handleAdd = async (name: ProductName) => {
    await cartClient.addItem(name)
    refetch()
  }

  const handleRemove = async (name: ProductName) => {
    await cartClient.removeItem(name)
    refetch()
  }

  const value: CartType = {
    cart,
    onAdd: handleAdd,
    onRemove: handleRemove,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
