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
  const [todoState, setTodoState] = useState<'read' | 'edit'>('read')
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <>
      {todoState === 'read' ? (
        <div
          className={`${isCompleted ? 'line-through' : ''}`}
          onClick={() => {
            if (!isCompleted) {
              setInputValue(todo.body ?? '')
              setTodoState('edit')
            }
          }}
        >
          <TypographyP>{todo.body}</TypographyP>
        </div>
      ) : (
        <Input
          id="task-edit"
          placeholder="Enter your task..."
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => setTodoState('read')}
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
