import { useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/auth/auth"

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation() as any
  const { login } = useAuth()
  const onLogin = useCallback((email: string, _password?: string) => {
    login(email)
    navigate(location?.state?.from?.pathname || "/dashboard", { replace: true })
  }, [navigate, location, login])
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  )
}


