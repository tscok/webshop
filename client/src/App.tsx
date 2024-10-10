import { CartProvider } from './contexts/cart-provider'
import { QueryClientProvider, queryClient } from './state/query'
import { CheckoutButton, ProductsPage } from './ui/cart'
import { Header, Layout, Main } from './ui/layout'
import { ThemeProvider } from './ui/theme-provider'

export const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Layout>
          <Header>
            <CheckoutButton />
          </Header>
          <Main>
            <ProductsPage />
          </Main>
        </Layout>
      </CartProvider>
    </QueryClientProvider>
  </ThemeProvider>
)
