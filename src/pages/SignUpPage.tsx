import { useCallback, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { SignUpForm } from "@/components/signup-form"
import { useAuth } from "@/auth/auth"

export default function SignUpPage() {
  const navigate = useNavigate()
  const location = useLocation() as any
  const { signUp } = useAuth()
  const [error, setError] = useState<string | undefined>()
  const onSignUp = useCallback(async (email: string, password?: string, name?: string) => {
    setError(undefined)
    const res = await signUp(email, password || "", name)
    if (res.ok) navigate(location?.state?.from?.pathname || "/dashboard", { replace: true })
    else setError(res.error)
  }, [navigate, location, signUp])
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUpForm onSignUp={onSignUp} error={error} />
      </div>
    </div>
  )
}


