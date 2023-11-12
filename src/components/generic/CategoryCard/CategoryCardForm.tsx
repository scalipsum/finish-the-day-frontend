import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface CategoryCardFormProps extends React.HTMLAttributes<HTMLFormElement> {
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const CategoryCardForm = ({
  inputValue,
  setInputValue,
  ...props
}: CategoryCardFormProps) => {
  return (
    <form {...props}>
      <div className="flex items-center justify-between space-x-2">
        <Input
          id="name"
          placeholder="Enter your task..."
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          variant="outline"
          className="py-6"
          type="submit"
          disabled={inputValue === ''}
        >
          Add
        </Button>
      </div>
    </form>
  )
}

export default CategoryCardForm
