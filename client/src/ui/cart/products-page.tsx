import Grid from '@mui/material/Grid2'
import { Summary } from './summary'

import { ProductsList } from './products-list'

export const ProductsPage = () => (
  <Grid container spacing={2}>
    <Grid size={8}>
      <ProductsList />
    </Grid>
    <Grid size={4}>
      <Summary />
    </Grid>
  </Grid>
)
