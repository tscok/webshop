import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import { useCartContext } from '../../hooks/use-cart-context'
import { formatMoney } from '../../utils/format-money'
import { SummaryItem } from './summary-item'

export const Summary = () => {
  const { cart, onAdd, onRemove } = useCartContext()

  return (
    <Paper sx={{ p: 3 }}>
      <List disablePadding subheader="Cart">
        <Divider component={ListItem} disableGutters />
        {cart.items.length === 0 && (
          <ListItem disableGutters>
            <ListItemText secondary="Cart is empty." />
          </ListItem>
        )}
        {cart.items.map((item) => (
          <SummaryItem
            key={item.name}
            item={item}
            onAdd={() => onAdd(item.name)}
            onRemove={() => onRemove(item.name)}
          />
        ))}
        <Divider component={ListItem} disableGutters disablePadding />
        <Typography
          component={ListItem}
          disableGutters
          variant="subtitle1"
          fontWeight={500}
        >
          {cart.total > 0 && `Total ${formatMoney(cart.total)}`}
        </Typography>
      </List>
    </Paper>
  )
}
