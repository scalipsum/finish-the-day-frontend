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

interface TodoItemSecondDropdownProps {
  day: Tables<'day'>
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TodoItemSecondDropdown = ({
  day,
  setMenuOpen
}: TodoItemSecondDropdownProps) => {
  const { categories } = useGetAllCategories()

  return (
    <DropdownMenuSub>
      {/* Trigger */}
      <DropdownMenuSubTrigger>{day.name}</DropdownMenuSubTrigger>
      {/* Content */}
      <DropdownMenuSubContent className="p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={(value) => {
                    setMenuOpen(false)
                  }}
                >
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}

export default TodoItemSecondDropdown
