import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandList } from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Calendar, MoreHorizontal, Trash } from 'lucide-react'
import { useState } from 'react'
import { useGetAllDays } from '../api/useGetAllDays'
import TodoItemSecondDropdown from './TodoItemSecondDropdown'
import { useAppContext } from '@/AppProvider'

interface TodoItemDropdownProps {
  todoID: number
  categoryID?: number
}

const TodoItemDropdown = ({ todoID, categoryID }: TodoItemDropdownProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { days } = useGetAllDays()
  const { supabase, triggerTodosRefetch } = useAppContext()

  const handleDeleteTodo = async () => {
    const { error } = await supabase.from('todo').delete().eq('id', todoID)
    if (error) return console.log('DeleteTodoError', error)
    triggerTodosRefetch()
  }

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="border-0 outline-none">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      {/* Content */}
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            {/* Trigger */}
            <DropdownMenuSubTrigger>
              <Calendar className="mr-2 h-4 w-4" />
              Transfer to...
            </DropdownMenuSubTrigger>
            {/* Content */}
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {days.map((day) => (
                      <TodoItemSecondDropdown
                        key={day.id}
                        day={day}
                        categoryID={categoryID}
                        todoID={todoID}
                        setMenuOpen={setMenuOpen}
                      />
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          {/* Delete Button */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600" onClick={handleDeleteTodo}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TodoItemDropdown
