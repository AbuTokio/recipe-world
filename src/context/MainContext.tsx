import { createContext } from "react"
import type { MainContextProps } from "./MainProvider"

export const mainContext = createContext<MainContextProps | null>(null)
