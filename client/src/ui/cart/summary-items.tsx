import { ListItem, ListItemText } from '@mui/material'
import { useCartContext } from '../../hooks/use-cart-context'
import { formatMoney } from '../../utils/format-money'
import { SummaryControls } from './summary-controls'

export const SummaryItems = () => {
  const { cart, onAdd, onRemove } = useCartContext()

  if (cart.items.length === 0) {
    return (
      <ListItem disableGutters>
        <ListItemText secondary="Cart is empty." />
      </ListItem>
    )
  }

  return cart.items.map((item) => {
    const price = formatMoney(item.price)
    const extra = item.discount > 0 ? `- ${formatMoney(item.discount)}` : ''
    return (
      <ListItem key={item.name} disableGutters>
        <ListItemText
          primary={item.name}
          secondary={`${item.count} * ${price} ${extra}`}
          sx={{ my: 0.5 }}
        />
        <SummaryControls
          onDecrease={() => onRemove(item.name)}
          onIncrease={() => onAdd(item.name)}
        />
      </ListItem>
    )
  })
}
