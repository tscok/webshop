import { Divider, List, ListItem, Paper, Typography } from '@mui/material'
import { useCartContext } from '../../hooks/use-cart-context'
import { formatMoney } from '../../utils/format-money'
import { SummaryItems } from './summary-items'

export const Summary = () => {
  const { total } = useCartContext()

  return (
    <Paper sx={{ p: 3 }}>
      <List disablePadding subheader="Cart">
        <Divider component={ListItem} disableGutters />
        <SummaryItems />
        <Divider component={ListItem} disableGutters disablePadding />
        <Typography
          component={ListItem}
          disableGutters
          variant="subtitle1"
          fontWeight={500}
        >
          {total > 0 && `Total ${formatMoney(total)}`}
        </Typography>
      </List>
    </Paper>
  )
}
