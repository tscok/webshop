import { QueryClient } from '@tanstack/react-query'

export {
  QueryClientProvider as QueryProvider,
  useMutation,
  useQuery,
} from '@tanstack/react-query'

export const queryClient = new QueryClient()
