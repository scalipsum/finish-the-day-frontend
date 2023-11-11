import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tables } from '@/utils/types'
import TodoList from './TodoList'
import { Button } from '@/components/ui/button'

interface CategoryCardProps {
  category: Tables<'category'>
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card className="w-full">
      {/* Header */}
      <CardHeader>
        <CardTitle className="capitalize">{category.name}</CardTitle>
        <CardDescription>
          All your {category.name} tasks go here.
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <form>
          <div className="flex items-center justify-between space-x-2">
            <Input id="name" placeholder="Name of your task" />
            <Button variant="outline" className="py-6">
              Add
            </Button>
          </div>
        </form>
        <TodoList categoryID={category.id} />
      </CardContent>
    </Card>
  )
}

export default CategoryCard
