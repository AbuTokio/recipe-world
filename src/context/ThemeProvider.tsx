import type React from "react"
import useTheme from "../hooks/ThemeHooks"
import { themeContext } from "./Contexts"

export interface ThemeContextProps {
  dark: boolean | null
  setDark: React.Dispatch<React.SetStateAction<boolean | null>>
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { dark, setDark } = useTheme()

  const value: ThemeContextProps = {
    dark,
    setDark,
  }

  return <themeContext.Provider value={value}>{children}</themeContext.Provider>
}
