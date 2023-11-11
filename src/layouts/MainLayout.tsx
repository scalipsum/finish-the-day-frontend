interface MainLayoutProps {
  children: JSX.Element | JSX.Element[]
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="light:bg-gray-200 h-screen w-screen p-4 dark:bg-gray-900">
      {children}
    </div>
  )
}

export default MainLayout
