import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "@/auth/ProtectedRoute"
import LoginPage from "@/pages/LoginPage"
import Dashboard from "@/pages/Dashboard"
import { useAuth } from "@/auth/auth"

function App() {
  const { isAuthenticated } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  )
}

export default App