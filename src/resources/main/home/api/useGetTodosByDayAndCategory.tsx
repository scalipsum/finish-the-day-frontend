import { useAppContext } from '@/AppProvider'
import { Tables } from '@/utils/types'
import { useEffect, useState } from 'react'

interface UseGetTodosByDayAndCategoryProps {
  dayID: number | undefined
  categoryID: number | undefined
  refetch: boolean
}

export const useGetTodosByDayAndCategory = ({
  dayID,
  categoryID,
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
        if (data) setTodos(data)
        if (error) return console.log('GetTodosByDayAndCategory', error)
      }
    }
    getData()
    // eslint-disable-next-line
  }, [dayID, categoryID, refetch])

  return { todos }
}
