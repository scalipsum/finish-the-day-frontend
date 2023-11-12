import { useEffect, useState } from 'react'

export const useRefetchData = () => {
  const [refetchData, setRefetchData] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setRefetchData(false), 1000)
  }, [])

  return { refetchData, setRefetchData }
}
