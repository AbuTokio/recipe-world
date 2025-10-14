import { createContext } from "react"
import type { MainContextProps } from "./MainProvider"
import type { ThemeContextProps } from "./ThemeProvider"

export const mainContext = createContext<MainContextProps | null>(null)
export const themeContext = createContext<ThemeContextProps | null>(null)
