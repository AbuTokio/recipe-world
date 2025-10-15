import { createContext } from "react"
import type { MainContextProps } from "./MainProvider"
import type { ThemeContextProps } from "./ThemeProvider"
import type { UserContextProps } from "./UserProvider"

export const mainContext = createContext<MainContextProps | null>(null)
export const themeContext = createContext<ThemeContextProps | null>(null)
export const userContext = createContext<UserContextProps | null>(null)
