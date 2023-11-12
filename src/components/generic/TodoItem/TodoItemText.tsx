import { useAppContext } from '@/AppProvider'
import { Input } from '@/components/ui/input'
import TypographyP from '@/components/ui/typography/TypographyP'
import { Tables } from '@/utils/types'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useState } from 'react'

interface TodoItemTextProps {
  todo: Tables<'todo'>
  isCompleted: CheckedState
}

const TodoItemText = ({ todo, isCompleted }: TodoItemTextProps) => {
  const { supabase, triggerTodosRefetch } = useAppContext()

  const [todoState, setTodoState] = useState<'read' | 'edit'>('read')
  const [inputValue, setInputValue] = useState<string | null>(null)

  const handleChangeTodoState = () => {
    if (todoState === 'read' && !isCompleted) {
      setInputValue(todo.body ?? '')
      return setTodoState('edit')
    }
    if (todoState === 'edit') return handleUpdateTodo()
  }

  const handleUpdateTodo = async () => {
    if (inputValue) {
      const { error } = await supabase
        .from('todo')
        .update({ body: inputValue })
        .eq('id', todo.id ?? -1)
      if (error) return console.log('UpdateTodoError', error)
      triggerTodosRefetch()
      setTodoState('read')
    }
  }

  return (
    <>
      {todoState === 'read' ? (
        <div
          className={`py-3 ${isCompleted ? 'line-through' : ''}`}
          onClick={handleChangeTodoState}
        >
          <TypographyP>{inputValue ?? todo.body}</TypographyP>
        </div>
      ) : (
        <Input
          id="task-edit"
          placeholder="Enter your task..."
          autoComplete="off"
          value={inputValue ?? ''}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleChangeTodoState}
          className="w-full border-none pl-0 dark:bg-slate-900"
          onKeyDown={(e) => {
            // @ts-expect-error ts-migrate(2531).
            if (e.key === 'Enter') e.target.blur()
          }}
        />
      )}
    </>
  )
}

export default TodoItemText
