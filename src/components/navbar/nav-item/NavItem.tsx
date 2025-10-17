import type { LucideProps } from "lucide-react"
import React from "react"
import { NavLink } from "react-router"

interface NavItemProps {
  label: string
  img?: string
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> | null
  to?: string | null
}

export default function NavItem({ label, img, icon = null, to = null }: NavItemProps) {
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
      {icon ? (
        React.createElement(icon, { className: "" })
      ) : (
        <img src={img} alt={label} className="w-6 h-6 rounded-full object-cover border border-primary" />
      )}
      <span>{label}</span>
    </NavLink>
  )
}
