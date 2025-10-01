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
    <label className={`inline-flex items-center relative cursor-pointer scale-[${scale}]`}>
      <div
        className={`relative w-[110px] h-[50px] rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r after:from-orange-500 after:to-yellow-400 after:top-[5px] after:left-[5px] active:after:w-[50px] shadow-sm duration-300 after:duration-300 after:shadow-md after:rounded-full cursor-pointer ${
          dark
            ? "bg-zinc-500 after:from-zinc-900 after:to-zinc-900 after:left-[105px] after:translate-x-[-100%]"
            : "bg-white"
        }`}
        onClick={toggleTheme}></div>

      <Sun
        className={`absolute w-6 h-6 left-[13px] ${
          dark ? "text-black fill-black opacity-60" : "text-white fill-white opacity-100"
        }`}
        onClick={toggleTheme}
      />
      <Moon
        className={`absolute w-6 h-6 right-[13px] ${
          dark ? "opacity-100 text-white fill-white" : "opacity-60 text-black fill-black"
        }`}
        onClick={toggleTheme}
      />
    </label>
  )
}
