import { ListItem, ListItemText } from '@mui/material'
import { useCartContext } from '../../hooks/use-cart-context'
import { formatMoney } from '../../utils/format-money'
import { SummaryControls } from './summary-controls'

export const SummaryItems = () => {
  const { items, onAdd, onRemove } = useCartContext()

  if (items.length === 0) {
    return (
      <ListItem disableGutters>
        <ListItemText secondary="Cart is empty." />
      </ListItem>
    )
  }

  return items.map(({ name, count, discount }) => (
    <ListItem key={name} disableGutters>
      <ListItemText
        primary={`${name} (${count})`}
        secondary={discount ? `${formatMoney(discount)} discount` : ``}
        sx={{ my: 0.5 }}
      />
      <SummaryControls
        onDecrease={() => onRemove(name)}
        onIncrease={() => onAdd(name)}
      />
    </ListItem>
  ))
}
