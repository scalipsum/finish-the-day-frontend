import AuthLayout from '@/components/layout/AuthLayout'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './login/LoginPage'

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
    </Routes>
  )
}

export default AuthRouter
