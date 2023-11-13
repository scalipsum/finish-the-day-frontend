import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import PageHeader from './PageHeader'

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
    <div className="light:bg-gray-200 relative min-h-screen w-screen pb-8 dark:bg-slate-900">
      <PageHeader />

      {/* Content */}
      <div className="px-2 py-6 sm:px-8">
        {/* Floating logout button*/}
        {(location.pathname === '/' || !isValidDay) && (
          <Navigate to="/monday" />
        )}
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
