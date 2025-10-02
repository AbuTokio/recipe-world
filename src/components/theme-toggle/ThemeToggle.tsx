import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../hooks/ThemeHooks"

interface ThemeToggleProps {
  scale?: number
}

export default function ThemeToggle({ scale = 1 }: ThemeToggleProps) {
  const { dark, setDark } = useTheme()

  if (dark === null) return null

  const toggleTheme = () => setDark(!dark)

  return (
    <label className={`inline-flex items-center relative cursor-pointer scale-[${scale.toString()}]`}>
      <div
        className={`relative w-[110px] h-[50px] rounded-full bg-muted after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r after:from-primary-dark after:to-primary-light after:top-[5px] after:left-[5px] active:after:w-[50px] shadow-sm duration-300 after:duration-300 after:shadow-md after:rounded-full cursor-pointer ${
          dark && "after:from-switch-background after:to-switch-background after:left-[105px] after:translate-x-[-100%]"
        }`}
        onClick={toggleTheme}></div>

      <Sun
        className={`absolute w-6 h-6 left-[13px] fill-foreground ${dark ? "opacity-60" : "opacity-100"}`}
        onClick={toggleTheme}
      />
      <Moon
        className={`absolute w-6 h-6 right-[13px] fill-foreground ${dark ? "opacity-100" : "opacity-60"}`}
        onClick={toggleTheme}
      />
    </label>
  )
}
