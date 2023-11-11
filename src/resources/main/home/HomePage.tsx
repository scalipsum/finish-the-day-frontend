import { useGetAllCategories } from './api/useGetAllCategories'
import CategoryCard from './components/CategoryCard'

const HomePage = () => {
  const { categories } = useGetAllCategories()

  return (
    <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}

export default HomePage
