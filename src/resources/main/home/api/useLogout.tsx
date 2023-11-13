import { useAppContext } from '@/AppProvider'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const { supabase, setIsLoggedIn } = useAppContext()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) return alert(error.message)
    setIsLoggedIn(false)
    navigate('/')
  }

  return { handleLogout }
}
