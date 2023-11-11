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

const TodoItemDropdown = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { days } = useGetAllDays()

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
          <DropdownMenuItem className="text-red-600">
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
