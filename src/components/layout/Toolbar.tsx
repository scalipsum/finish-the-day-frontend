import {
  LogOut,
  Mail,
  MessageSquare,
  UserCog,
  UserPlus,
  CheckSquare2,
  Square
} from 'lucide-react'
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
import { useLogout } from '@/resources/main/home/api/useLogout'
import { useGetAllDays } from '@/resources/main/home/api/useGetAllDays'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'

const Toolbar = () => {
  const { handleLogout } = useLogout()
  const { day: currentDayName } = useParams()
  const { days } = useGetAllDays()
  const daysArray = useMemo(
    () => days.filter((day) => day.name !== currentDayName),
    [days, currentDayName]
  )

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
                <span>Move All Unchecked</span>
              </DropdownMenuSubTrigger>
              {/* Days */}
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {daysArray.map((day) => (
                    <DropdownMenuItem key={day.id}>
                      <span>{day.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* Remove all checked*/}
            <DropdownMenuItem className="text-red-500">
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
