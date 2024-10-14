import { Badge, IconButton } from '@mui/material'
import ShoppingCart from '@mui/icons-material/ShoppingCartCheckout'
import { useCartContext } from '../../hooks/use-cart-context'

export const CheckoutButton = () => {
  const { cart } = useCartContext()

  return (
    <div>
      <IconButton aria-label="cart">
        <Badge badgeContent={cart.count} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
    </div>
  )
}
