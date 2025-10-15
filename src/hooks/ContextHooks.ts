import { useContext } from "react"
import { mainContext, themeContext, userContext } from "../context/Contexts"

export function useMain() {
  const ctx = useContext(mainContext)
  if (!ctx) throw new Error("useMain() must be used within MainProvider")
  return ctx
}

export function useTheme() {
  const ctx = useContext(themeContext)
  if (!ctx) throw new Error("useTheme() must be used within ThemeProvider")
  return ctx
}

export function useUser() {
  const ctx = useContext(userContext)
  if (!ctx) throw new Error("useUser() must be used within UserProvider")
  return ctx
}
