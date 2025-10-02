import { useResponsive } from "../../hooks/ResponsiveHooks"
import { Logo } from "../logo/Logo"
import Navbar from "../navbar/Navbar"
import ThemeToggle from "../theme-toggle/ThemeToggle"

export default function Header() {
  const bp = useResponsive()

  return (
    <header className="flex flex-col md:flex-row justify-between items-center sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <Logo />
      {bp.isMd && (
        <div className="flex gap-4">
          <Navbar />
          <ThemeToggle />
        </div>
      )}
    </header>
  )
}
