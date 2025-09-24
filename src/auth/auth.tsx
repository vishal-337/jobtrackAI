import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { supabase } from "@/supabaseClient"

type AuthResult = { ok: true } | { ok: false; error: string }

type AuthContextValue = {
  isAuthenticated: boolean
  isReady: boolean
  login: (email: string, password: string) => Promise<AuthResult>
  signUp: (email: string, password: string, name?: string) => Promise<AuthResult>
  logout: () => Promise<void>
  resetPassword: (email: string, redirectTo?: string) => Promise<AuthResult>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session)
      setIsReady(true)
    })
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session)
      setIsReady(true)
    })
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { ok: false, error: error.message } as const
    return { ok: true } as const
  }, [])

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: name ? { name } : undefined },
    })
    if (error) return { ok: false, error: error.message } as const
    return { ok: true } as const
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const resetPassword = useCallback(async (email: string, redirectTo?: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirectTo || window.location.origin })
    if (error) return { ok: false, error: error.message } as const
    return { ok: true } as const
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, isReady, login, signUp, logout, resetPassword }),
    [isAuthenticated, isReady, login, signUp, logout, resetPassword]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}


