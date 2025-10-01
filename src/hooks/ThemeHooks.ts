import { useEffect, useState } from "react"

export function useTheme() {
  const [dark, setDark] = useState<boolean | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved) {
      setDark(saved === "dark")
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [])

  useEffect(() => {
    if (dark === null) return
    if (dark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [dark])

  return { dark, setDark }
}
