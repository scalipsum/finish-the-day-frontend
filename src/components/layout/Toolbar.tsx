import { CogIcon } from 'lucide-react'
import ActionDropdown from '../generic/ActionDropdown'
import { Button } from '../ui/button'

const Toolbar = () => {
  return (
    <div className="flex w-full justify-end bg-indigo-925 px-0 sm:px-6">
      <ActionDropdown
        triggerComponent={
          <Button
            variant="ghost"
            className="-mr-2 opacity-30 outline-none dark:text-white sm:mr-0"
          >
            <CogIcon className="mr-1 h-4 w-4" />
            Settings
          </Button>
        }
      />
    </div>
  )
}

export default Toolbar
