import { SupabaseClient } from '@supabase/supabase-js'
import React, { useContext, useState } from 'react'

import { Database } from '../database.types'
import { useRefetchData } from './utils/hooks/useRefetchData'

type AppContextType = {
  supabase: SupabaseClient<Database, 'public'>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  refetchTodos: boolean
  triggerTodosRefetch: () => void
}
export const AppContext = React.createContext<AppContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  supabase: {} as SupabaseClient<Database, 'public'>,
  refetchTodos: true,
  triggerTodosRefetch: () => {}
})

type AppProviderProps = {
  children: React.ReactNode
  client: SupabaseClient<Database, 'public'>
}

const AppProvider = ({ children, client }: AppProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] =
    useState<AppContextType['isLoggedIn']>(true)

  // Todos Refetching
  const { refetchData: refetchTodos, setRefetchData: setRefetchTodos } =
    useRefetchData()
  const triggerTodosRefetch = () => {
    setRefetchTodos(true)
    setTimeout(() => setRefetchTodos(false), 1000)
  }

  return (
    <AppContext.Provider
      value={{
        supabase: client,
        isLoggedIn,
        setIsLoggedIn,
        refetchTodos,
        triggerTodosRefetch
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
