import { useAppContext } from '@/AppProvider'
import dayjs from 'dayjs'
import { Navigate, useLocation } from 'react-router-dom'

interface AuthRouteProps {
  children: JSX.Element
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { isLoggedIn } = useAppContext()
  const location = useLocation()
  const currentCalendarDay = dayjs().format('dddd').toLowerCase()

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
