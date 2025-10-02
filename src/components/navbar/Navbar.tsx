import { Building2, CookingPot, House, User } from "lucide-react"
import NavItem from "./nav-item/NavItem"

interface NavbarProps {
  className?: string | null
}

export default function Navbar({ className = null }: NavbarProps) {
  return (
    <nav className={`flex justify-center items-center w-full ${className !== null && className}`}>
      <NavItem label="Home" icon={House} />
      <NavItem label="Recipes" icon={CookingPot} />
      <NavItem label="About" icon={Building2} />
      <NavItem label="Login" icon={User} />
    </nav>
  )
}
