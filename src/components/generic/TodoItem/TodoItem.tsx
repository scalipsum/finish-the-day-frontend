import { Tables } from '@/utils/types'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useEffect, useState } from 'react'
import TodoItemCheckbox from './TodoItemCheckbox'
import TodoItemDropdown from './TodoItemDropdown'
import TodoItemText from './TodoItemText'

interface TodoItemProps {
  todo: Tables<'todo'>
  categoryID: number | undefined
}

const TodoItem = ({ todo, categoryID }: TodoItemProps) => {
  const [isCompleted, setIsCompleted] = useState<CheckedState>(false)

  useEffect(() => {
    if (typeof todo.is_completed === 'boolean')
      setIsCompleted(todo.is_completed)
  }, [todo])

  return (
    <div
      className={`mb-2 flex w-full flex-col items-start justify-between rounded-md border border-slate-800 ${
        isCompleted ? 'bg-transparent' : 'bg-slate-900'
      } pr-4 sm:flex-row sm:items-center`}
    >
      <div className="flex flex-1 items-center space-x-3">
        <TodoItemCheckbox
          todoID={todo.id}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
        />
        <TodoItemText todo={todo} isCompleted={isCompleted} />
      </div>
      <TodoItemDropdown todoID={todo.id ?? -1} categoryID={categoryID} />
    </div>
  )
}

export default TodoItem
