import Grid from '@mui/material/Grid2'
import { Stack } from '@mui/material'
import { useProducts } from '../../hooks/use-products'
import { ProductItem } from './product-item'
import { useCartContext } from '../../hooks/use-cart-context'
import { useDiscounts } from '../../hooks/use-discounts'
import { SummaryList } from './summary-list'
import { SummaryItem } from './summary-item'
import { SummaryControls } from './summary-controls'

export const ProductsPage = () => {
  const products = useProducts()
  const discounts = useDiscounts()
  const { items, onAdd, onRemove, total } = useCartContext()

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        <Stack spacing={2}>
          {Object.values(products).map((product) => (
            <ProductItem
              key={product.name}
              {...product}
              message={discounts[product.name]?.info}
              onAddToCart={() => onAdd(product.name)}
            />
          ))}
        </Stack>
      </Grid>
      <Grid size={4}>
        <SummaryList items={items} total={total}>
          {items.map((item) => (
            <SummaryItem {...item}>
              <SummaryControls
                onIncrease={() => onAdd(item.name)}
                onDecrease={() => onRemove(item.name)}
              />
            </SummaryItem>
          ))}
        </SummaryList>
      </Grid>
    </Grid>
  )
}
