import { Tables } from '@/utils/types'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useEffect, useState } from 'react'
import TodoItemCheckbox from './TodoItemCheckbox'
import TodoItemDropdown from './TodoItemDropdown'
import TodoItemText from './TodoItemText'
import { animated, easings, useSpring } from '@react-spring/web'

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

  const [springs, api] = useSpring(() => ({
    from: { y: 0 },
    config: {
      easing: easings.steps(5),
      duration: 150
    }
  }))

  const handleStartAnimation = () => {
    api.start({
      from: { y: 0 },
      to: [{ y: -60 }, { y: 40 }, { y: -25 }, { y: 10 }, { y: 0 }]
    })
  }

  return (
    <animated.div
      className={`mb-2 flex w-full flex-col items-start justify-between rounded-md border border-slate-800 
${isCompleted ? 'bg-slate-925' : 'bg-transparent'} 
duration-[175] pr-4 transition sm:flex-row sm:items-center`}
      style={{ ...springs }}
    >
      <div className="flex flex-1 items-center space-x-3 py-0">
        <TodoItemCheckbox
          todoID={todo.id}
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
          handleStartAnimation={handleStartAnimation}
        />
        <TodoItemText todo={todo} isCompleted={isCompleted} />
      </div>
      <TodoItemDropdown todoID={todo.id ?? -1} categoryID={categoryID} />
    </animated.div>
  )
}

export default TodoItem
