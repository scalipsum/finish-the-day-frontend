import { useAppContext } from '@/AppProvider'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAppContext()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }
  return children
}

export default ProtectedRoute