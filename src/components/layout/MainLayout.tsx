import { Navigate, Outlet, useLocation } from 'react-router-dom'
import TypographyH1 from '../ui/typography/TypographyH1'

const MainLayout = () => {
  const location = useLocation()
  return (
    <div className="light:bg-gray-200 h-screen w-screen p-4 dark:bg-blue-950">
      <div>
        <TypographyH1>Hello there</TypographyH1>
      </div>
      {location.pathname === '/' && <Navigate to="/" />}
      <Outlet />
    </div>
  )
}

export default MainLayout
