import MainLayout from '@/components/layout/MainLayout'
import { currentCalendarDay } from '@/utils'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './home/HomePage'
import ProtectedRoute from '@/utils/routes/ProtectedRoute'

const MainRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to={`/${currentCalendarDay}`} />} />
        <Route path="/:day" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default MainRouter
