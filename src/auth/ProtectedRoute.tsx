import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "./auth"

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}


