import { useAppContext } from '@/AppProvider'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tables } from '@/utils/types'
import { FormEvent, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import CategoryCardForm from './CategoryCardForm'
import { useGetDayByName } from '@/resources/main/home/api/useGetDayByName'
import TodoList from '../TodoList'

interface CategoryCardProps {
  category: Tables<'category'>
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { day } = useParams()
  const { day: apiDay } = useGetDayByName({ name: day ?? '' })
  const dayID = useMemo(() => apiDay?.id, [apiDay])
  const { supabase, triggerTodosRefetch, currentUserDetails } = useAppContext()

  const [inputValue, setInputValue] = useState<string>('')

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault()
    await supabase
      .from('todo')
      .insert({
        body: inputValue,
        category_id: category.id,
        day_id: dayID,
        user_id: currentUserDetails?.id
      })
      .single()
      .then(() => {
        setInputValue('')
        triggerTodosRefetch()
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
        <CategoryCardForm
          onSubmit={handleAddTodo}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <TodoList categoryID={category.id} dayID={dayID} />
      </CardContent>
    </Card>
  )
}

export default CategoryCard
