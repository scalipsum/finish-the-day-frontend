import { useAppContext } from '@/AppProvider'
import { useGetAllDays } from '@/resources/main/home/api/useGetAllDays'
import { useGetTodosByDay } from '@/resources/main/home/api/useGetTodosByDay'
import { useLogout } from '@/resources/main/home/api/useLogout'
import { CheckSquare2, LogOut, Square, UserCog } from 'lucide-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

const Toolbar = () => {
  const { currentUserDetails, supabase, triggerTodosRefetch } = useAppContext()
  const { handleLogout } = useLogout()

  const { day: currentDayName } = useParams()
  const { days } = useGetAllDays()
  const currentDayID = days.find((day) => day.name === currentDayName)?.id

  /**
   * Transfer all Unchecked Todos
   */
  const transferableDays = useMemo(
    () => days.filter((day) => day.name !== currentDayName),
    [days, currentDayName]
  )
  const { todos } = useGetTodosByDay({
    dayID: currentDayID,
    userID: currentUserDetails?.id
  })
  const allUncheckedTodos = useMemo(
    () => todos.filter((todo) => !todo.is_completed),
    [todos]
  )
  const handleTransferAllUncheckedTodos = async (dayID: number) => {
    const updateData = allUncheckedTodos.map((todo) => {
      return {
        ...todo,
        day_id: dayID
      }
    })
    // @ts-expect-error-next-line
    const { error } = await supabase.from('todo').upsert(updateData)
    if (error) return console.log('TransferAllUncheckedTodos', error)
    return triggerTodosRefetch()
  }

  /**
   * Remove all checked todos
   */
  const allCheckedTodos = useMemo(
    () => todos.filter((todo) => todo.is_completed),
    [todos]
  )
  const handleRemoveAllCheckedTodos = async () => {
    const { error } = await supabase
      .from('todo')
      .delete()
      .in(
        'id',
        allCheckedTodos.map((todo) => todo.id)
      )
    if (error) return console.log('RemoveAllCheckedTodos', error)
    return triggerTodosRefetch()
  }

  return (
    <div className="flex w-full justify-end bg-indigo-925 px-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            className="px-0 opacity-30 outline-none dark:text-white"
          >
            <UserCog className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {/* Move all unchecked */}
            <DropdownMenuSub>
              {/* Trigger */}
              <DropdownMenuSubTrigger>
                <Square className="mr-2 h-4 w-4" />
                <span>Transfer All Unchecked</span>
              </DropdownMenuSubTrigger>
              {/* Days */}
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {transferableDays.map((day) => (
                    <DropdownMenuItem
                      key={day.id}
                      onClick={() =>
                        handleTransferAllUncheckedTodos(day.id ?? -1)
                      }
                    >
                      <span>{day.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* Remove all checked*/}
            <DropdownMenuItem
              className="text-red-500"
              onClick={handleRemoveAllCheckedTodos}
            >
              <CheckSquare2 className="mr-2 h-4 w-4" />
              <span className="">Remove all checked</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          {/* Logout */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Toolbar
