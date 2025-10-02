import { useResponsive } from "../../hooks/ResponsiveHooks"
import Navbar from "../navbar/Navbar"

export default function Footer() {
  const bp = useResponsive()

  return (
    <footer className="px-8 flex flex-col justify-between items-center">
      {!bp.isLg && (
        <Navbar
          className={
            "fixed bottom-0 z-50 w-full border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
          }
        />
      )}
    </footer>
  )
}
