import { Tables } from '@/utils/types'
import TodoItemDropdown from './TodoItemDropdown'
import TypographyP from '@/components/ui/typography/TypographyP'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'

interface TodoItemProps {
  todo: Tables<'todo'>
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isSelected, setIsSelected] = useState<CheckedState>(false)

  useEffect(() => {
    if (todo.is_completed !== undefined && todo.is_completed !== null) {
      setIsSelected(todo.is_completed)
    }
  }, [todo])

  return (
    <label
      htmlFor={String(todo.id)}
      className={`mb-2 flex w-full cursor-pointer flex-col items-start justify-between rounded-md border border-slate-800 ${
        isSelected ? 'bg-slate-900' : ''
      } px-4 py-2 sm:flex-row sm:items-center`}
    >
      <div className="flex items-center space-x-4">
        <Checkbox
          id={String(todo.id)}
          checked={isSelected}
          onCheckedChange={(value) => setIsSelected(value)}
        />
        <div className={isSelected ? 'line-through' : ''}>
          <TypographyP>{todo.body}</TypographyP>
        </div>
      </div>
      <TodoItemDropdown />
    </label>
  )
}

export default TodoItem
