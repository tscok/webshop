import { Badge, IconButton, Skeleton } from '@mui/material'
import { useCartContext } from '../../hooks/use-cart-context'

export const CheckoutButton = () => {
  const { cart } = useCartContext()

  return (
    <IconButton size="large" color="inherit">
      <Badge badgeContent={cart.count} color="primary">
        <Skeleton animation={false} height={24} variant="circular" width={24} />
      </Badge>
    </IconButton>
  )
}
