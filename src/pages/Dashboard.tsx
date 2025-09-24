import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/auth/auth"

export default function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  function handleLogout() {
    logout()
    navigate("/login", { replace: true })
  }
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>Welcome</div>
            <Button onClick={handleLogout}>Logout</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


