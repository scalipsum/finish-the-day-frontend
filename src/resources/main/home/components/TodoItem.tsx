import { Tables } from '@/utils/types'
import TodoItemDropdown from './TodoItemDropdown'
import TypographyP from '@/components/ui/typography/TypographyP'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useAppContext } from '@/AppProvider'

interface TodoItemProps {
  todo: Tables<'todo'>
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { supabase } = useAppContext()

  const [isSelected, setIsSelected] = useState<CheckedState>(false)

  useEffect(() => {
    if (todo.is_completed !== undefined && todo.is_completed !== null) {
      setIsSelected(todo.is_completed)
    }
  }, [todo])

  const handleCompleteTodo = async () => {
    const { data, error } = await supabase
      .from('todo')
      .update({ is_completed: !isSelected })
      .eq('id', todo.id ?? -1)
      .select()
    if (error) return console.log('UpdateTodoError', error)
    if (data) return console.log(data)
  }

  return (
    <div
      className={`mb-2 flex w-full flex-col items-start justify-between rounded-md border border-slate-800 ${
        isSelected ? 'bg-slate-900' : 'bg-transparent'
      } pr-4 sm:flex-row sm:items-center`}
    >
      <div className="flex items-center space-x-3">
        <label
          htmlFor={String(todo.id)}
          className="mt-1 cursor-pointer py-3 pl-4"
          onClick={handleCompleteTodo}
        >
          <Checkbox
            id={String(todo.id)}
            checked={isSelected}
            onCheckedChange={(value) => setIsSelected(value)}
          />
        </label>
        <div className={`${isSelected ? 'line-through' : ''}`}>
          <TypographyP>{todo.body}</TypographyP>
        </div>
      </div>
      <TodoItemDropdown todoID={todo.id ?? -1} />
    </div>
  )
}

export default TodoItem
