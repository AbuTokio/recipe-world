import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../hooks/ContextHooks"

export default function ThemeToggle() {
  const { dark, setDark } = useTheme()

  if (dark === null) return null

  const toggleTheme = () => setDark(!dark)

  return (
    <label className="inline-flex items-center relative cursor-pointer">
      <div
        className={`relative w-15 h-8 rounded-full bg-muted after:absolute after:content-[''] after:w-6 after:h-6 after:bg-gradient-to-r after:from-primary-dark after:to-primary-light after:top-[50%] after:-translate-y-1/2 after:left-1 active:after:w-13 shadow-sm duration-300 after:duration-300 after:shadow-md after:rounded-full cursor-pointer ${
          dark && "after:from-switch-background after:to-switch-background after:left-14 after:translate-x-[-100%]"
        }`}
        onClick={toggleTheme}></div>

      <Sun
        className={`absolute w-4 h-4 left-2 fill-foreground ${dark ? "opacity-60" : "opacity-100"}`}
        onClick={toggleTheme}
      />
      <Moon
        className={`absolute w-4 h-4 right-2 fill-foreground ${dark ? "opacity-100" : "opacity-60"}`}
        onClick={toggleTheme}
      />
    </label>
  )
}
