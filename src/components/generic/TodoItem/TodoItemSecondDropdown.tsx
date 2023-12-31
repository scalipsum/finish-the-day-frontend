import { useAppContext } from '@/AppProvider'
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
import { useGetAllCategories } from '@/resources/main/home/api/useGetAllCategories'
import { Tables } from '@/utils/types'
import { useParams } from 'react-router-dom'

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

  const handleTransferTodo = async (selectedCategoryID: string | undefined) => {
    // Transfer to same category - different day
    if (!selectedCategoryID) {
      const { error } = await supabase
        .from('todo')
        .update({
          day_id: day.id
        })
        .eq('id', todoID ?? -1)
      if (error) return console.log('TransferTodoError', error)
      setMenuOpen(false)
      return triggerTodosRefetch()
    }
    // Transfer to same day - different category
    const { error } = await supabase
      .from('todo')
      .update({
        day_id: day.id,
        category_id: Number(selectedCategoryID)
      })
      .eq('id', todoID ?? -1)
    if (error) return console.log('TransferTodoError', error)
    setMenuOpen(false)
    return triggerTodosRefetch()
  }

  return (
    <DropdownMenuSub>
      {/* Trigger */}
      {day.name === currentDayName ? (
        <DropdownMenuSubTrigger>{day.name}</DropdownMenuSubTrigger>
      ) : (
        <CommandItem
          value={day.name}
          onSelect={() => handleTransferTodo(undefined)}
          className="cursor-pointer"
        >
          {day.name}
        </CommandItem>
      )}
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
