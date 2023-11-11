import { useMemo } from 'react'

import { useParams } from 'react-router-dom'
import { useGetDayByName } from '../api/useGetDayByName'
import { useGetTodosByDayAndCategory } from '../api/useGetTodosByDayAndCategory'
import TodoItem from './TodoItem'

interface TodoListProps {
  categoryID: number | undefined
}
const TodoList = ({ categoryID }: TodoListProps) => {
  const { day } = useParams()
  const { day: apiDay } = useGetDayByName({ name: day ?? '' })

  const dayID = useMemo(() => apiDay?.id, [apiDay])
  const { todos } = useGetTodosByDayAndCategory({ dayID, categoryID })

  return (
    <div className="mt-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodoList
