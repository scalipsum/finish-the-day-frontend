import { createClient } from '@supabase/supabase-js'
import { useEffect } from 'react'

import { Database } from '../database.types'
import { ModeToggle } from './components/ui/ModeToggle'
import { ThemeProvider } from './components/ui/ThemeProvider'
import MainLayout from './layouts/MainLayout'

const App = () => {
  const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )

  useEffect(() => {
    const getData = async () => {
      // const { data } = await supabase
      //   .from('todo')
      //   .select('id, body, is_completed, day (name), category (name)')
      //
      // const { data } = await supabase
      //   .from('days_categories')
      //   .select('day !inner(name), category (name)')
      //   .eq('day.name', 'monday')
      // console.log(data)
    }
    getData()
    // eslint-disable-next-line
  }, [])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MainLayout>
        <ModeToggle />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
