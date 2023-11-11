import { useGetTodosByDayAndCategory } from '../api/useGetTodosByDayAndCategory'
import TodoItem from './TodoItem'

interface TodoListProps {
  categoryID: number | undefined
  dayID: number | undefined
}
const TodoList = ({ categoryID, dayID }: TodoListProps) => {
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
