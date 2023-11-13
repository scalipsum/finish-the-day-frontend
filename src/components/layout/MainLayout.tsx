import { Outlet, useNavigate } from 'react-router-dom'
import PageHeader from './PageHeader'
import { Button } from '../ui/button'
import { isMobile } from 'react-device-detect'
import { useAppContext } from '@/AppProvider'

const MainLayout = () => {
  const { supabase, setIsLoggedIn } = useAppContext()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) return alert(error.message)
    setIsLoggedIn(false)
    navigate(0)
  }

  return (
    <div className="light:bg-gray-200 relative min-h-screen w-screen pb-8 dark:bg-slate-900">
      <PageHeader />
      {/* Content */}
      <div className="px-2 pt-6 sm:px-8">
        <Outlet />
        {isMobile && (
          <div className="flex justify-end">
            <Button
              className="mt-24 dark:bg-slate-800 dark:text-slate-500"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MainLayout
