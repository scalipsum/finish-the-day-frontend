import { useAppContext } from '@/AppProvider'
import { useGetAllDays } from '@/resources/main/home/api/useGetAllDays'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button'
import TypographyH1 from '../ui/typography/TypographyH1'

const PageHeader = () => {
  const { day } = useParams()
  const navigate = useNavigate()
  const { triggerTodosRefetch } = useAppContext()

  const { days } = useGetAllDays()
  const daysArray = useMemo(() => days.map((day) => day.name), [days])
  const currentDayIndex = useMemo(
    () => daysArray.indexOf(day),
    [daysArray, day]
  )

  const goToPreviousDay = () => {
    if (currentDayIndex === 0) {
      navigate(`/${daysArray[daysArray.length - 1]}`)
      return triggerTodosRefetch()
    }
    navigate(`/${daysArray[currentDayIndex - 1]}`)
    return triggerTodosRefetch()
  }

  const goToNextDay = () => {
    if (currentDayIndex === daysArray.length - 1) {
      navigate(`/${daysArray[0]}`)
      return triggerTodosRefetch()
    }
    navigate(`/${daysArray[currentDayIndex + 1]}`)
    return triggerTodosRefetch()
  }

  return (
    <div className="relative flex h-28 items-center justify-center gap-16 bg-indigo-900 sm:h-44 lg:gap-32">
      {/* Previous Day */}
      <Button
        variant="outline"
        size="icon"
        className="duration-[175] absolute -ml-80 mt-3 opacity-25 transition-all hover:opacity-80 dark:border-slate-200 dark:bg-transparent dark:text-slate-200 dark:hover:bg-transparent md:ml-[-550px]"
        onClick={goToPreviousDay}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <TypographyH1>{day}</TypographyH1>
      {/* Next day */}
      <Button
        variant="outline"
        size="icon"
        className="duration-[175] absolute ml-80 mt-3 opacity-30 transition-all hover:opacity-80 dark:border-slate-200 dark:bg-transparent dark:text-slate-200 dark:hover:bg-transparent md:ml-[550px]"
        onClick={goToNextDay}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default PageHeader
