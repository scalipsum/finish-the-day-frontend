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
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetDayByName } from '../api/useGetDayByName'
import { useAppContext } from '@/AppProvider'

interface CategoryCardProps {
  category: Tables<'category'>
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { day } = useParams()
  const { day: apiDay } = useGetDayByName({ name: day ?? '' })
  const dayID = useMemo(() => apiDay?.id, [apiDay])
  const { supabase, setRefetchTodos } = useAppContext()

  const [inputValue, setInputValue] = useState<string>('')

  const handleAddTodo = async () => {
    await supabase
      .from('todo')
      .insert({
        body: inputValue,
        category_id: category.id,
        day_id: dayID
      })
      .single()
      .then(() => {
        setInputValue('')
        // Refetch
        setRefetchTodos(true)
        setTimeout(() => setRefetchTodos(false), 1000)
      })
  }

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
            <Input
              id="name"
              placeholder="Name of your task"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              variant="outline"
              className="py-6"
              onClick={handleAddTodo}
              type="button"
              disabled={inputValue === ''}
            >
              Add
            </Button>
          </div>
        </form>
        <TodoList categoryID={category.id} dayID={dayID} />
      </CardContent>
    </Card>
  )
}

export default CategoryCard
