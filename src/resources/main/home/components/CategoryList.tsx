import CategoryCard from '@/components/generic/CategoryCard/CategoryCard'
import { useGetAllCategories } from '../api/useGetAllCategories'

const CategoryList = () => {
  const { categories } = useGetAllCategories()

  return (
    <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}

export default CategoryList
