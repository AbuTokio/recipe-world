import type React from "react"
import { Navigate } from "react-router"
import { useUser } from "../hooks/ContextHooks"
import Splash from "../pages/splash/Splash"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useUser()

  if (loading) return <Splash />

  if (!isLoggedIn) return <Navigate to="/login" replace />

  return children
}
