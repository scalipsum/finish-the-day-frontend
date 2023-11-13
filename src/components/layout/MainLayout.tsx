import { Outlet } from 'react-router-dom'
import PageHeader from './PageHeader'

const MainLayout = () => {
  return (
    <div className="light:bg-gray-200 relative min-h-screen w-screen pb-8 dark:bg-slate-900">
      <PageHeader />
      {/* Content */}
      <div className="px-2 py-6 sm:px-8">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
