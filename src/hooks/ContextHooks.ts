import { useContext } from "react"
import { mainContext, themeContext } from "../context/Contexts"

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
