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
import { ToastAction } from '@/components/ui/toast'
import TypographyP from '@/components/ui/typography/TypographyP'
import { useToast } from '@/components/ui/use-toast'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { toast } = useToast()
  const { supabase } = useAppContext()

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) return alert(error.message)
    toast({
      title: "Verify your email. We've sent you a link!"
    })
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="w-full sm:w-96">
        <CardHeader className="mb-3 space-y-2">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Register so you can start organizing your day.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
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
            <div className="-mb-2 ml-6 mt-3 flex items-center">
              <TypographyP>Have an account?</TypographyP>
              <Button
                variant="link"
                className="-ml-2 py-0 underline dark:text-slate-600 hover:dark:text-slate-50"
                type="button"
                onClick={() => navigate('/auth/login')}
              >
                Login
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default RegisterPage
