import { useAppContext } from '@/AppProvider'
import { Tables } from '@/utils/types'
import { useEffect, useState } from 'react'

interface UseGetTodosByDayAndCategoryProps {
  dayID: number | undefined
  categoryID: number | undefined
}

export const useGetTodosByDayAndCategory = ({
  dayID,
  categoryID
}: UseGetTodosByDayAndCategoryProps) => {
  const { supabase } = useAppContext()
  const [todos, setTodos] = useState<Tables<'todo'>[]>([])

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from('todo')
        .select('id, body, is_completed, day (name), category (name)')
        .eq('day_id', dayID ?? '')
        .eq('category_id', categoryID ?? '')
      if (data) setTodos(data)
      if (error) return console.log(error)
    }
    getData()
    // eslint-disable-next-line
  }, [dayID, categoryID])

  return { todos }
}
