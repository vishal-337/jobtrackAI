import { createBrowserRouter, Navigate } from "react-router-dom"
import ProtectedRoute from "@/auth/ProtectedRoute"
import LoginPage from "@/pages/LoginPage"
import Dashboard from "@/pages/Dashboard"
import { useAuth } from "@/auth/auth"
import SignUpPage from "@/pages/SignUpPage"
import ForgotPasswordPage from "@/pages/ForgotPasswordPage"

function RootRedirect() {
  const { isAuthenticated, isReady } = useAuth()
  if (!isReady) return null
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
}

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { element: <ProtectedRoute />, children: [{ path: "/dashboard", element: <Dashboard /> }] },
  { path: "/", element: <RootRedirect /> },
  { path: "*", element: <RootRedirect /> },
])

export default router


