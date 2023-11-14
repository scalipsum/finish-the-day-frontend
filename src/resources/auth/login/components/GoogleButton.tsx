import { useAppContext } from '@/AppProvider'
import { currentCalendarDay } from '@/utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const GoogleButton = () => {
  const {
    supabase,
    setCurrentUserDetails,
    setIsLoggedIn,
    triggerTodosRefetch
  } = useAppContext()
  const navigate = useNavigate()

  async function handleSignInWithGoogle(response: any) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential
    })
    if (error) return console.log(error.message)
    if (data) {
      setCurrentUserDetails(data.user)
      setIsLoggedIn(true)
      triggerTodosRefetch()
      navigate(`/${currentCalendarDay}`)
      console.log(data)
    }
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.body.appendChild(script)
    // @ts-expect-error-next-line
    window.handleSignInWithGoogle = handleSignInWithGoogle
    return () => {
      document.body.removeChild(script)
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="410290703194-16u9lbn45crq3u2ecnrp7fbuognldd2i.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-nonce=""
        data-auto_select="true"
        data-itp_support="true"
      ></div>
      <div
        // eslint-disable-next-line
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  )
}

export default GoogleButton
