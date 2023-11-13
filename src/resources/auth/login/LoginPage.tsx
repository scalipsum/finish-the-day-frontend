import { useAppContext } from '@/AppProvider'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import TypographyP from '@/components/ui/typography/TypographyP'
import { currentCalendarDay } from '@/utils'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {
    supabase,
    setIsLoggedIn,
    triggerTodosRefetch,
    setCurrentUserDetails
  } = useAppContext()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) return alert(error.message)
    setCurrentUserDetails(data.user)
    setIsLoggedIn(true)
    triggerTodosRefetch()
    navigate(`/${currentCalendarDay}`)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="w-full sm:w-96">
        <CardHeader className="mb-3 space-y-2">
          <CardTitle className="text-2xl">Login to continue</CardTitle>
          <CardDescription>
            Enter your details below to enter into your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              Enter
            </Button>
            <div className="-mb-2 ml-6 mt-2 flex items-center">
              <TypographyP>or</TypographyP>
              <Button
                variant="link"
                className="-ml-2 py-0 underline dark:text-slate-600 hover:dark:text-slate-50"
                type="button"
                onClick={() => navigate('/auth/register')}
              >
                Create an account
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage
