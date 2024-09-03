import { ListItem, ListItemText } from '@mui/material'
import { CartItem } from '../../types'
import { formatMoney } from '../../utils/format-money'
import { PropsWithChildren } from 'react'

export const SummaryItem = ({
  children,
  discount,
  ...item
}: PropsWithChildren<CartItem>) => {
  const discountInfo = discount ? ` (${formatMoney(discount)} discount)` : ``
  return (
    <ListItem key={item.name} disableGutters>
      <ListItemText
        primary={`${item.name} (${item.count})`}
        secondary={`Subtotal ${formatMoney(item.subtotal)}` + discountInfo}
        sx={{ my: 0.5 }}
      />
      {children}
    </ListItem>
  )
}
