import { useMemo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthLayout = () => {
  const location = useLocation()
  const path = useMemo(() => location.pathname, [location])
  return (
    <div>
      {(path === '/auth' || path === '/auth/') && <Navigate to="/auth/login" />}
      <Outlet />
    </div>
  )
}

export default AuthLayout
