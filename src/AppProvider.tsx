import { SupabaseClient } from '@supabase/supabase-js'
import React, { useContext, useState } from 'react'

import { Database } from '../database.types'
import { useRefetchData } from './utils/hooks/useRefetchData'

type AppContextType = {
  supabase: SupabaseClient<Database, 'public'>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  refetchTodos: boolean
  setRefetchTodos: React.Dispatch<React.SetStateAction<boolean>>
}
export const AppContext = React.createContext<AppContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  supabase: {} as SupabaseClient<Database, 'public'>,
  refetchTodos: true,
  setRefetchTodos: () => {}
})

type AppProviderProps = {
  children: React.ReactNode
  client: SupabaseClient<Database, 'public'>
}

const AppProvider = ({ children, client }: AppProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] =
    useState<AppContextType['isLoggedIn']>(true)

  const { refetchData: refetchTodos, setRefetchData: setRefetchTodos } =
    useRefetchData()

  return (
    <AppContext.Provider
      value={{
        supabase: client,
        isLoggedIn,
        setIsLoggedIn,
        refetchTodos,
        setRefetchTodos
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
