import { useAppContext } from '@/AppProvider'
import CategoryList from './components/CategoryList'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { isLoggedIn } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) return navigate('/auth/login')
  }, [isLoggedIn])

  if (!isLoggedIn) return <></>
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row">
      <CategoryList />
    </div>
  )
}

export default HomePage
