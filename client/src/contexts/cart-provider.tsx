import { createContext, PropsWithChildren } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Cart, Product, ProductName } from '../../../types'
import Api from '../api'
import { queryClient } from '../state/query'

const api = new Api()

type CartType = {
  cart: Cart
  onAdd: (name: ProductName) => void
  onRemove: (name: ProductName) => void
  products: Product[]
}

const DEFAULT_CART: Cart = { count: 0, items: [], total: 0 }

export const CartContext = createContext<CartType>({} as CartType)

export const CartProvider = ({ children }: PropsWithChildren) => {
  const { data: cart = DEFAULT_CART } = useQuery({
    queryKey: ['cart'],
    queryFn: api.getCart,
  })

  const { mutate: onAdd } = useMutation({
    mutationFn: api.addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const { mutate: onRemove } = useMutation({
    mutationFn: api.delCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts,
  })

  const value: CartType = {
    cart,
    onAdd,
    onRemove,
    products,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
