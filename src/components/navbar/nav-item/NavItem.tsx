import { NavLink } from "react-router"

interface NavItemProps {
  label: string
  to?: string | null
}

export default function NavItem({ label, to = null }: NavItemProps) {
  return (
    <NavLink className={(state) => `${state.isActive && "border-b-2"} text-black`} to={to || `/${label.toLowerCase()}`}>
      {label}
    </NavLink>
  )
}
