import { Badge, IconButton, Skeleton } from '@mui/material'
import { useCartContext } from '../../hooks/use-cart-context'

export const CheckoutButton = () => {
  const { items } = useCartContext()

  const count = items.reduce((sum, item) => sum + item.count, 0)

  return (
    <IconButton size="large" color="inherit">
      <Badge badgeContent={count} color="primary">
        <Skeleton animation={false} height={24} variant="circular" width={24} />
      </Badge>
    </IconButton>
  )
}
