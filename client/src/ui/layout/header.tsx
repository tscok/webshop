import { AppBar, Box, Skeleton, Toolbar, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

export const Header = ({ children }: PropsWithChildren) => (
  <AppBar
    position="static"
    color="inherit"
    elevation={0}
    sx={{
      borderColor: 'divider',
      borderStyle: 'solid',
      borderWidth: '0 0 1px',
    }}
  >
    <Toolbar>
      <Typography variant="h5" component="div" sx={{ minWidth: 200 }}>
        <Skeleton animation={false} />
      </Typography>
      <Box flex={1} />
      <div>{children}</div>
    </Toolbar>
  </AppBar>
)
