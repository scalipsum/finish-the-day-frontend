import { Navigate, Outlet, useLocation } from 'react-router-dom'

const MainLayout = () => {
  const location = useLocation()
  return (
    <div className="light:bg-gray-100 h-screen w-screen p-4 dark:bg-gray-900">
      {location.pathname === '/' && <Navigate to="/" />}
      <Outlet />
    </div>
  )
}

export default MainLayout
