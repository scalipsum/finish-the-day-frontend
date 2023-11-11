import { useAppContext } from '@/AppProvider'
import { Tables } from '@/utils/types'
import { useEffect, useState } from 'react'

export const useGetAllCategories = () => {
  const { supabase } = useAppContext()
  const [categories, setCategories] = useState<Tables<'category'>[]>([])

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('category').select()
      if (data) setCategories(data)
      if (error) return console.log(error)
    }
    getData()
    // eslint-disable-next-line
  }, [])

  return { categories }
}
