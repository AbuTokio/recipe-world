import { Building2, CookingPot, House, User } from "lucide-react"
import NavItem from "./nav-item/NavItem"

export default function Navbar() {
  return (
    <nav className={`flex gap-4 fixed bottom-0 md:static justify-center items-center w-full`}>
      <NavItem label="Home" icon={House} />
      <NavItem label="Recipes" icon={CookingPot} />
      <NavItem label="About" icon={Building2} />
      <NavItem label="Login" icon={User} />
    </nav>
  )
}
