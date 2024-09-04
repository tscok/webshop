import { Divider, List, ListItem, Paper, Typography } from '@mui/material'
import { formatMoney } from '../../utils/format-money'
import { PropsWithChildren } from 'react'
import { CartItem } from '../../types'

export const SummaryList = ({
  children,
  items,
  total,
}: PropsWithChildren<{ items: CartItem[]; total: number }>) => (
  <Paper sx={{ p: 3 }}>
    <List
      disablePadding
      subheader={
        <Typography component="li" variant="h5">
          Summary
        </Typography>
      }
    >
      {items.length > 0 && <Divider component={ListItem} disableGutters />}
      {children}
      {items.length > 0 && (
        <>
          <Divider component={ListItem} disableGutters disablePadding />
          <Typography
            component={ListItem}
            disableGutters
            variant="subtitle1"
            fontWeight={500}
          >
            Total {formatMoney(total)}
          </Typography>
        </>
      )}
    </List>
  </Paper>
)
