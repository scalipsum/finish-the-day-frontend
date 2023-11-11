import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import TypographyH1 from '../ui/typography/TypographyH1'

const MainLayout = () => {
  const location = useLocation()
  const { day } = useParams()

  const isValidDay =
    day === 'monday' ||
    day === 'tuesday' ||
    day === 'wednesday' ||
    day === 'thursday' ||
    day === 'friday' ||
    day === 'saturday' ||
    day === 'sunday'

  return (
    <div className="light:bg-gray-200 h-screen w-screen dark:bg-slate-900">
      <div className="flex h-36 items-center justify-center bg-indigo-900">
        <TypographyH1>{day}</TypographyH1>
      </div>
      <div className="px-8 pt-6">
        {(location.pathname === '/' || !isValidDay) && (
          <Navigate to="/monday" />
        )}
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
