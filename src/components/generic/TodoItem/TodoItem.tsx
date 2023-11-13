import { Tables } from '@/utils/types'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useEffect, useState } from 'react'
import TodoItemCheckbox from './TodoItemCheckbox'
import TodoItemDropdown from './TodoItemDropdown'
import TodoItemText from './TodoItemText'
import { animated, easings, useSpring } from '@react-spring/web'
import { useMobile } from '@/utils/hooks/useMobile'

interface TodoItemProps {
  todo: Tables<'todo'>
  categoryID: number | undefined
}

const TodoItem = ({ todo, categoryID }: TodoItemProps) => {
  const [isCompleted, setIsCompleted] = useState<CheckedState>(false)
  const { isMobile } = useMobile()

  useEffect(() => {
    if (typeof todo.is_completed === 'boolean')
      setIsCompleted(todo.is_completed)
  }, [todo])

  const [springs, api] = useSpring(() => ({
    from: { y: 0 },
    config: {
      easing: isMobile ? undefined : easings.steps(5),
      duration: 150
    }
  }))

  const handleStartAnimation = () => {
    api.start({
      from: { y: 0 },
      to: isMobile
        ? [{ y: -60 }, { y: 40 }, { y: -25 }, { y: 10 }, { y: 0 }]
        : [{ y: -40 }, { y: 20 }, { y: -10 }, { y: 5 }, { y: 0 }]
    })
  }

  return (
    <animated.div
      className={`mb-2 flex w-full flex-row items-center justify-between rounded-md border border-slate-800 
${isCompleted ? 'bg-slate-925' : 'bg-transparent'} 
duration-[175] pr-0 transition sm:flex-row sm:items-center sm:pr-4`}
      style={springs}
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
