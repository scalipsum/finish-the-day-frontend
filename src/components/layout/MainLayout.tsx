import { Outlet } from 'react-router-dom'
import PageHeader from './PageHeader'
import Toolbar from './Toolbar'

const MainLayout = () => {
  return (
    <div className="light:bg-gray-200 relative min-h-screen w-screen pb-8 dark:bg-slate-900">
      <Toolbar />
      <PageHeader />
      {/* Content */}
      <div className="px-2 pt-6 sm:px-8">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
