import { useAppContext } from '@/AppProvider'
import { Tables } from '@/utils/types'
import { useEffect, useState } from 'react'

export const useGetAllDays = () => {
  const { supabase } = useAppContext()
  const [days, setDays] = useState<Tables<'day'>[]>([])

  useEffect(() => {
    const getApiDays = async () => {
      const { data, error } = await supabase.from('day').select()
      if (data) return setDays(data)
      if (error) return console.error(error)
    }
    getApiDays()
    // eslint-disable-next-line
  }, [supabase])

  return { days }
}
