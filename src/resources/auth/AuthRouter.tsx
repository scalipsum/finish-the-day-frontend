import AuthLayout from '@/components/layout/AuthLayout'
import AuthRoute from '@/utils/routes/AuthRoute'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './login/LoginPage'

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
      </Route>
    </Routes>
  )
}

export default AuthRouter
