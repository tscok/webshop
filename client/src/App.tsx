import { CartProvider } from './contexts/cart-provider'
import { QueryProvider, queryClient } from './libs/tanstack'
import { CheckoutButton, ProductsPage } from './ui/cart'
import { Header, Layout, Main } from './ui/layout'
import { ThemeProvider } from './ui/theme-provider'
import { LoginForm } from './ui/auth/login-form'
import { AuthProvider } from './contexts/auth-provider'

export const App = () => (
  <ThemeProvider>
    <QueryProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Header>
              <CheckoutButton />
            </Header>
            <Main>
              <ProductsPage />
              <LoginForm />
            </Main>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </QueryProvider>
  </ThemeProvider>
)
