import { useAppContext } from '@/AppProvider'
import { Navigate, useLocation } from 'react-router-dom'
import { currentCalendarDay } from '..'

interface AuthRouteProps {
  children: JSX.Element
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { isLoggedIn } = useAppContext()
  const location = useLocation()

  if (isLoggedIn) {
    return (
      <Navigate
        to={`/${currentCalendarDay}`}
        replace
        state={{ from: location }}
      />
    )
  }

  return children
}

export default AuthRoute
