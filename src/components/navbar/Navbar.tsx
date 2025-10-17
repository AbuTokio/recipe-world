import { Building2, CookingPot, House, User } from "lucide-react"
import NavItem from "./nav-item/NavItem"
import { useUser } from "../../hooks/ContextHooks"

interface NavbarProps {
  className?: string | null
}

export default function Navbar({ className = null }: NavbarProps) {
  const { user } = useUser()

  return (
    <nav className={`flex justify-center items-center w-full ${className !== null && className}`}>
      <NavItem label="Home" icon={House} />
      <NavItem label="Recipes" icon={CookingPot} />
      <NavItem label="About" icon={Building2} />
      {user && user.img_url ? <NavItem label="Profile" img={user.img_url} /> : <NavItem label="Profile" icon={User} />}
      {!user && <NavItem label="Login" icon={User} />}
    </nav>
  )
}
