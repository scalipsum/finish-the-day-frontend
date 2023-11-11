import { Route, Routes } from 'react-router-dom'

import MainLayout from '@/components/layout/MainLayout'
import ProtectedRoute from '@/utils/routes/ProtectedRoute'

import HomePage from './home/HomePage'

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
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default MainRouter
