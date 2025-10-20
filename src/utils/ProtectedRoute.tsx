import { Navigate, Outlet } from "react-router"
import { useUser } from "../hooks/ContextHooks"
import Splash from "../pages/splash/Splash"

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useUser()

  if (loading) return <Splash />
  if (!isLoggedIn) return <Navigate to="/login" replace />

  return <Outlet />
}
