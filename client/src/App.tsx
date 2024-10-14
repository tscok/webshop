import { CartProvider } from './contexts/cart-provider'
import { QueryClientProvider, queryClient } from './state/query'
import { CheckoutButton, ProductsPage } from './ui/cart'
import { Header, Layout, Main } from './ui/layout'
import { ThemeProvider } from './ui/theme-provider'
import { UserProfile } from './ui/user/user-profile'

export const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Layout>
          <Header>
            <UserProfile />
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
