import { Navigate, useLocation } from 'react-router-dom'

import { useAppContext } from '@/AppProvider'

interface AuthRouteProps {
  children: JSX.Element
  exceptions?: string[]
}

const AuthRoute = ({ children, exceptions = [] }: AuthRouteProps) => {
  const { isLoggedIn } = useAppContext()
  const location = useLocation()

  if (isLoggedIn && !exceptions.includes(location.pathname)) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return children
}

export default AuthRoute
