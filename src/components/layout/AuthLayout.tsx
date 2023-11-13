interface AuthLayoutProps {
  children: JSX.Element
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="light:bg-gray-200 min-h-screen w-screen dark:bg-slate-900">
      {children}
    </div>
  )
}

export default AuthLayout
