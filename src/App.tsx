import { createClient } from '@supabase/supabase-js'

import { Database } from '../database.types'
import AppProvider from './AppProvider'
import AppRouter from './AppRouter'
import { ThemeProvider } from './components/ui/ThemeProvider'
import { Toaster } from './components/ui/toaster'

const App = () => {
  const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AppProvider client={supabase}>
        <AppRouter />
        <Toaster />
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
