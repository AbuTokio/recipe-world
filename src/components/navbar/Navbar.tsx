import { Building2, CookingPot, House, User } from "lucide-react"
import { useResponsive } from "../../hooks/ResponsiveHooks"
import NavItem from "./nav-item/NavItem"

export default function Navbar() {
  const bp = useResponsive()

  return (
    <nav className={`flex gap-4`}>
      <NavItem label="Home" icon={!bp.isMd ? House : null} />
      <NavItem label="Recipes" icon={!bp.isMd ? CookingPot : null} />
      <NavItem label="About" icon={!bp.isMd ? Building2 : null} />
      <NavItem label="Login" icon={!bp.isMd ? User : null} />
    </nav>
  )
}
