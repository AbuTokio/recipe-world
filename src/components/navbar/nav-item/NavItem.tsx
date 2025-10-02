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
            : "lg:bg-transparent text-foreground hover:bg-accent hover:text-foreground"
        } flex flex-col lg:flex-row items-center rounded-t-2xl lg:rounded-lg gap-2 px-3 py-2 text-muted-foreground transition-colors w-20 lg:w-auto`
      }
      to={to || `/${label.toLowerCase()}`}>
      {icon ? React.createElement(icon, { className: "" }) : label}
      {icon && <span>{label}</span>}
    </NavLink>
  )
}
