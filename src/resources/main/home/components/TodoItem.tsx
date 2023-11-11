import { Tables } from '@/utils/types'
import TodoItemDropdown from './TodoItemDropdown'
import TypographyP from '@/components/ui/typography/TypographyP'

interface TodoItemProps {
  todo: Tables<'todo'>
}

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-between rounded-md border border-slate-800 px-4 py-3 sm:flex-row sm:items-center">
      <div className="flex items-center">
        <TypographyP>{todo.body}</TypographyP>
      </div>
      <TodoItemDropdown />
    </div>
  )
}

export default TodoItem
