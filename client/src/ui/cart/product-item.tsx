import { Box, Button, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { formatMoney } from '../../utils/format-money'
import { Product } from '../../../../types'

const mediaSize = 90

export const ProductItem = ({
  onAdd,
  product,
}: {
  onAdd: () => void
  product: Product
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
            {product.name}
          </Typography>
          <Typography component="div" variant="subtitle1">
            {formatMoney(product.price)}
          </Typography>
        </Stack>
        <Typography component="div" variant="body2" color="textSecondary">
          {product.discount?.info ?? <Skeleton animation={false} />}
        </Typography>
      </Box>
      <Button onClick={onAdd} variant="contained">
        Add to Cart
      </Button>
    </Stack>
  </Paper>
)
