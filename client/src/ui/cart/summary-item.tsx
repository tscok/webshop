import { ListItem, ListItemText } from '@mui/material'
import { formatMoney } from '../../utils/format-money'
import { SummaryControls } from './summary-controls'
import { CartItem } from '../../../../types'

export const SummaryItem = ({
  item,
  onAdd,
  onRemove,
}: {
  item: CartItem
  onAdd: () => void
  onRemove: () => void
}) => {
  const price = formatMoney(item.price)
  const extra = item.discount > 0 ? `- ${formatMoney(item.discount)}` : ''

  return (
    <ListItem key={item.name} disableGutters>
      <ListItemText
        primary={item.name}
        secondary={`${item.count} x ${price} ${extra}`}
        sx={{ my: 0.5 }}
      />
      <SummaryControls onDecrease={onRemove} onIncrease={onAdd} />
    </ListItem>
  )
}
