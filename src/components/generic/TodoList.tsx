import { useAppContext } from '@/AppProvider'
import TodoItem from '@/components/generic/TodoItem/TodoItem'
import { useGetTodosByDayAndCategory } from '@/resources/main/home/api/useGetTodosByDayAndCategory'

interface TodoListProps {
  categoryID: number | undefined
  dayID: number | undefined
}
const TodoList = ({ categoryID, dayID }: TodoListProps) => {
  const { refetchTodos } = useAppContext()
  const { todos } = useGetTodosByDayAndCategory({
    dayID,
    categoryID,
    refetch: refetchTodos
  })

  return (
    <div className="mt-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} categoryID={categoryID} />
      ))}
    </div>
  )
}

export default TodoList
