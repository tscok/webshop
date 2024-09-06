import { Stack } from '@mui/material'
import { useProducts } from '../../hooks/use-products'
import { ProductItem } from './product-item'
import { useCartContext } from '../../hooks/use-cart-context'
import { useDiscounts } from '../../hooks/use-discounts'

export const ProductsList = () => {
  const discounts = useDiscounts()
  const products = useProducts()
  const { onAdd } = useCartContext()

  if (!products) return null

  return (
    <Stack spacing={2}>
      {Object.values(products).map((product) => (
        <ProductItem
          key={product.name}
          {...product}
          message={discounts?.[product.name]?.deal}
          onAddToCart={() => onAdd(product.name)}
        />
      ))}
    </Stack>
  )
}
