import { useAppContext } from '@/AppProvider'
import { Navigate, useParams } from 'react-router-dom'
import { currentCalendarDay } from '..'
import LoginPage from '@/resources/auth/login/LoginPage'
import AuthLayout from '@/components/layout/AuthLayout'

interface ProtectedRouteProps {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAppContext()
  const { day } = useParams()

  const isValidDay =
    day === 'monday' ||
    day === 'tuesday' ||
    day === 'wednesday' ||
    day === 'thursday' ||
    day === 'friday' ||
    day === 'saturday' ||
    day === 'sunday'

  if (!isLoggedIn)
    return (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    )
  if (!isValidDay) return <Navigate to={`/${currentCalendarDay}`} />
  return children
}

export default ProtectedRoute
