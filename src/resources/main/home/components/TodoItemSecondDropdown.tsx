import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu'
import { Tables } from '@/utils/types'
import { useGetAllCategories } from '../api/useGetAllCategories'
import { useParams } from 'react-router-dom'
import { useAppContext } from '@/AppProvider'
import { useState } from 'react'

interface TodoItemSecondDropdownProps {
  todoID: number | undefined
  day: Tables<'day'>
  categoryID: number | undefined
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TodoItemSecondDropdown = ({
  todoID,
  day,
  categoryID,
  setMenuOpen
}: TodoItemSecondDropdownProps) => {
  const { day: currentDayName } = useParams()
  const { supabase, triggerTodosRefetch } = useAppContext()
  const { categories } = useGetAllCategories()

  const handleTransferTodo = async (selectedCategoryID: string) => {
    const { error } = await supabase
      .from('todo')
      .update({
        day_id: day.id,
        category_id: Number(selectedCategoryID)
      })
      .eq('id', todoID ?? -1)
    if (error) return console.log('TransferTodoError', error)
    setMenuOpen(false)
    triggerTodosRefetch()
  }

  return (
    <DropdownMenuSub>
      {/* Trigger */}
      <DropdownMenuSubTrigger>{day.name}</DropdownMenuSubTrigger>
      {/* Content */}
      <DropdownMenuSubContent className="p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {categories.map((category) => {
                const currentCategory =
                  day.name === currentDayName && categoryID === category.id
                if (!currentCategory)
                  return (
                    <CommandItem
                      key={category.id}
                      value={String(category.id)}
                      onSelect={(value) => handleTransferTodo(value)}
                    >
                      {category.name}
                    </CommandItem>
                  )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}

export default TodoItemSecondDropdown
