import { useAppContext } from '@/AppProvider'
import { Tables } from '@/utils/types'
import { useEffect, useState } from 'react'

interface UseGetDayByNameProps {
  name: string
}

export const useGetDayByName = ({ name }: UseGetDayByNameProps) => {
  const { supabase } = useAppContext()
  const [day, setDay] = useState<Tables<'day'>>()

  useEffect(() => {
    const getDayByName = async () => {
      const { data, error } = await supabase
        .from('day')
        .select()
        .eq('name', name)
      if (data) return setDay(data[0])
      if (error) return console.log('GetDayByName', error)
    }
    getDayByName()
    // eslint-disable-next-line
  }, [])
  return { day }
}
