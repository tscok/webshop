import { Stack } from '@mui/material'
import { useProducts } from '../../hooks/use-products'
import { ProductItem } from './product-item'
import { useCartContext } from '../../hooks/use-cart-context'

export const ProductsList = () => {
  const products = useProducts()
  const { onAdd } = useCartContext()

  return (
    <Stack spacing={2}>
      {products.map((product) => (
        <ProductItem
          key={product.name}
          {...product}
          message={product.discount?.deal}
          onAddToCart={() => onAdd(product.name)}
        />
      ))}
    </Stack>
  )
}
