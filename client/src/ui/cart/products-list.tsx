import { Stack } from '@mui/material'
import { useCartContext } from '../../hooks/use-cart-context'
import { ProductItem } from './product-item'

export const ProductsList = () => {
  const { onAdd, products } = useCartContext()

  return (
    <Stack spacing={2}>
      {products.map((product) => (
        <ProductItem
          key={product.name}
          onAdd={() => onAdd(product.name)}
          product={product}
        />
      ))}
    </Stack>
  )
}
