import { useResponsive } from "../../hooks/ResponsiveHooks"
import { Logo } from "../logo/Logo"
import Navbar from "../navbar/Navbar"
import ThemeToggle from "../theme-toggle/ThemeToggle"

export default function Header() {
  const bp = useResponsive()

  return (
    <header className="px-8 py-4 flex flex-col lg:flex-row justify-between items-center lg:sticky lg:top-0 lg:z-50 w-full lg:border-b lg:border-border lg:bg-card/95 lg:backdrop-blur lg:supports-[backdrop-filter]:bg-card/60">
      <Logo />
      {bp.isLg && (
        <div className="flex gap-12">
          <Navbar className="gap-4" />
          <ThemeToggle />
        </div>
      )}
    </header>
  )
}
