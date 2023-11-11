import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthRouter from './resources/auth/AuthRouter'
import MainRouter from './resources/main/MainRouter'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainRouter />} />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
