import { useAppContext } from '@/AppProvider'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckedState } from '@radix-ui/react-checkbox'
import React from 'react'

interface TodoItemCheckboxProps {
  todoID: number | undefined
  isCompleted: CheckedState
  setIsCompleted: React.Dispatch<React.SetStateAction<CheckedState>>
  handleStartAnimation: () => void
}
const TodoItemCheckbox = ({
  todoID,
  isCompleted,
  setIsCompleted,
  handleStartAnimation
}: TodoItemCheckboxProps) => {
  const { supabase } = useAppContext()

  const handleCompleteTodo = async () => {
    if (!isCompleted) handleStartAnimation()
    const { error } = await supabase
      .from('todo')
      .update({ is_completed: !isCompleted })
      .eq('id', todoID ?? -1)
    if (error) return console.log('UpdateTodoError', error)
  }

  return (
    <label
      htmlFor={String(todoID)}
      className="mt-1 cursor-pointer pl-4"
      onClick={handleCompleteTodo}
    >
      <Checkbox
        id={String(todoID)}
        checked={isCompleted}
        onCheckedChange={(value) => setIsCompleted(value)}
      />
    </label>
  )
}

export default TodoItemCheckbox
