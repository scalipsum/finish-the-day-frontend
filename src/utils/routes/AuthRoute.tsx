import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useAppContext } from '@/AppProvider'
import dayjs from 'dayjs'

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
