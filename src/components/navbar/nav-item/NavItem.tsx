import type { LucideProps } from "lucide-react"
import React from "react"
import { NavLink } from "react-router"

interface NavItemProps {
  label: string
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> | null
  to?: string | null
}

export default function NavItem({ label, icon = null, to = null }: NavItemProps) {
  return (
    <NavLink
      className={(state) =>
        `${
          state.isActive
            ? "bg-primary text-white"
            : "bg-muted md:bg-transparent text-foreground hover:bg-accent hover:text-foreground"
        } flex flex-col md:flex-row items-center rounded-t-2xl md:rounded-lg  gap-2 px-3 py-2 text-muted-foreground transition-colors w-24 md:w-auto`
      }
      to={to || `/${label.toLowerCase()}`}>
      {icon ? React.createElement(icon, { className: "m-2" }) : label}
      {icon && <span>{label}</span>}
    </NavLink>
  )
}
