import { Route, Routes } from 'react-router-dom'
import AuthLayout from '@/components/layout/AuthLayout'
import LoginPage from './login/LoginPage'
import RegisterPage from './register/RegisterPage'

const AuthRouter = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        }
      />
    </Routes>
  )
}

export default AuthRouter
