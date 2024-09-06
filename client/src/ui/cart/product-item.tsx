import { Box, Button, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { formatMoney } from '../../utils/format-money'

const mediaSize = 90

export const ProductItem = ({
  message,
  name,
  onAddToCart,
  price,
}: {
  message?: string
  name: string
  onAddToCart: () => void
  price: number
}) => (
  <Paper sx={{ display: 'flex' }} variant="outlined">
    <Skeleton
      animation={false}
      height={mediaSize}
      variant="rectangular"
      width={mediaSize}
    />
    <Stack
      alignItems="end"
      direction="row"
      flex={1}
      justifyContent="space-between"
      p={2}
      spacing={2}
    >
      <Box flex={1}>
        <Stack alignItems="end" direction="row" spacing={2}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography component="div" variant="subtitle1">
            {formatMoney(price)}
          </Typography>
        </Stack>
        <Typography component="div" variant="body2" color="textSecondary">
          {message ?? <Skeleton animation={false} />}
        </Typography>
      </Box>
      <Button onClick={onAddToCart} variant="contained">
        Add to Cart
      </Button>
    </Stack>
  </Paper>
)
