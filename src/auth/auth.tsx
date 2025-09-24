import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

type AuthContextValue = {
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const v = localStorage.getItem("auth:isAuthenticated")
    setIsAuthenticated(v === "true")
  }, [])

  const login = useCallback((email: string) => {
    localStorage.setItem("auth:isAuthenticated", "true")
    localStorage.setItem("auth:email", email)
    setIsAuthenticated(true)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("auth:isAuthenticated")
    localStorage.removeItem("auth:email")
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}


