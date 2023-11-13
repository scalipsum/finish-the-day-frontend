import CategoryList from './components/CategoryList'

const HomePage = () => {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row">
      <CategoryList />
    </div>
  )
}

export default HomePage
