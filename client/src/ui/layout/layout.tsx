import { Container, Paper, Stack } from '@mui/material'
import { PropsWithChildren } from 'react'

export const Layout = ({ children }: PropsWithChildren) => (
  <Container disableGutters maxWidth="lg">
    <Paper elevation={3} square>
      <Stack minHeight="100vh">{children}</Stack>
    </Paper>
  </Container>
)
