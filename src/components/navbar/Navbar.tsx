import NavItem from "./nav-item/NavItem"

export default function Navbar() {
  return (
    <nav className="flex gap-4">
      <NavItem label="Home" />
      <NavItem label="Recipes" />
      <NavItem label="About" />
      <NavItem label="Login" />
    </nav>
  )
}
