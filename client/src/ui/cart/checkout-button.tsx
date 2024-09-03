import { Badge, IconButton, Skeleton } from '@mui/material'
import { useCartContext } from '../../hooks/use-cart-context'
import { getItemCount } from '../../utils/cart-counts'

export const CheckoutButton = () => {
  const { items } = useCartContext()

  return (
    <IconButton size="large" color="inherit">
      <Badge badgeContent={getItemCount(items)} color="primary">
        <Skeleton animation={false} height={24} variant="circular" width={24} />
      </Badge>
    </IconButton>
  )
}
