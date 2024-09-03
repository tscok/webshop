import { CssBaseline } from '@mui/material'
import MuiThemeProvider from '@mui/material/styles/ThemeProvider'
import { PropsWithChildren } from 'react'
import { theme } from './theme'

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    {children}
  </MuiThemeProvider>
)
