import { createClient } from '@supabase/supabase-js'
import { Button } from './components/ui/button'
import { ModeToggle } from './components/ui/ModeToggle'
import { ThemeProvider } from './components/ui/ThemeProvider'
import MainLayout from './layouts/MainLayout'

const App = () => {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MainLayout>
        <ModeToggle />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
