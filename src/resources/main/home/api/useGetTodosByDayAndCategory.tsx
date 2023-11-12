import { useAppContext } from '@/AppProvider'
import { Tables } from '@/utils/types'
import { useEffect, useState } from 'react'

interface UseGetTodosByDayAndCategoryProps {
  dayID: number | undefined
  categoryID: number | undefined
  userID: string | undefined
  refetch: boolean
}

export const useGetTodosByDayAndCategory = ({
  dayID,
  categoryID,
  userID,
  refetch
}: UseGetTodosByDayAndCategoryProps) => {
  const { supabase } = useAppContext()
  const [todos, setTodos] = useState<Tables<'todo'>[]>([])

  useEffect(() => {
    const getData = async () => {
      if (dayID && categoryID && refetch) {
        const { data, error } = await supabase
          .from('todo')
          .select('id, body, is_completed, day (name), category (name)')
          .eq('day_id', dayID ?? '')
          .eq('category_id', categoryID ?? '')
          .eq('user_id', userID ?? '')
          .order('created_at', { ascending: true })
        if (data) setTodos(data)
        if (error) return console.log('GetTodosByDayAndCategory', error)
      }
    }
    getData()
    // eslint-disable-next-line
  }, [dayID, categoryID, refetch])

  return { todos }
}
