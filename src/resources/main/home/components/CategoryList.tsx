import CategoryCard from '@/components/generic/CategoryCard/CategoryCard'
import { useGetAllCategories } from '../api/useGetAllCategories'

const CategoryList = () => {
  const { categories } = useGetAllCategories()

  return (
    <>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </>
  )
}

export default CategoryList
