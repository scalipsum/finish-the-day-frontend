import { Route, Routes } from 'react-router-dom'

import AuthLayout from '@/components/layout/AuthLayout'
import AuthRoute from '@/utils/routes/AuthRoute'

import LoginPage from './login/LoginPage'
import RegisterPage from './register/RegisterPage'

const AuthRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute>
            <AuthLayout />
          </AuthRoute>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default AuthRouter
