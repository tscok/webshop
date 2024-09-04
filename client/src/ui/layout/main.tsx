import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export const Main = ({ children }: PropsWithChildren) => (
  <Box component="main" flexGrow="1" pt={10} px={3}>
    {children}
  </Box>
)
