import { useAppContext } from '@/AppProvider'
import { Tables } from '@/utils/types'
import { useEffect, useState } from 'react'

interface UseGetTodosByDayProps {
  dayID: number | undefined
  userID: string | undefined
  // refetch: boolean
}

export const useGetTodosByDay = ({ dayID, userID }: UseGetTodosByDayProps) => {
  const { supabase } = useAppContext()
  const [todos, setTodos] = useState<Tables<'todo'>[]>([])

  useEffect(() => {
    const getData = async () => {
      if (dayID) {
        const { data, error } = await supabase
          .from('todo')
          .select('*')
          .eq('day_id', dayID ?? '')
          .eq('user_id', userID ?? '')
          .order('created_at', { ascending: true })
        if (data) setTodos(data)
        if (error) return console.log('GetTodosByDay', error)
      }
    }
    getData()
    // eslint-disable-next-line
  }, [dayID, userID])

  return { todos }
}
