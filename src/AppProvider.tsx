import { SupabaseClient, createClient } from '@supabase/supabase-js'
import React, { useContext, useState } from 'react'
import { Database } from '../database.types'

type AppContextType = {
  supabase: SupabaseClient<Database, 'public'> | null
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}
export const AppContext = React.createContext<AppContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  supabase: null
})

type AppProviderProps = {
  children: React.ReactNode
  client: SupabaseClient<Database, 'public'>
}

const AppProvider = ({ children, client }: AppProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] =
    useState<AppContextType['isLoggedIn']>(true)

  return (
    <AppContext.Provider
      value={{ supabase: client, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
