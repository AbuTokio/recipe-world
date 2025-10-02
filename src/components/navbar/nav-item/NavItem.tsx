import type { LucideProps } from "lucide-react"
import React from "react"
import { NavLink } from "react-router"
import { useResponsive } from "../../../hooks/ResponsiveHooks"

interface NavItemProps {
  label: string
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> | null
  to?: string | null
}

export default function NavItem({ label, icon = null, to = null }: NavItemProps) {
  const bp = useResponsive()

  return (
    <NavLink
      className={(state) =>
        `${
          state.isActive && (!bp.isMd ? "bg-red-500" : "border-b-2")
        } text-black dark:text-white rounded-full bg-gray-50`
      }
      to={to || `/${label.toLowerCase()}`}>
      {icon ? React.createElement(icon, { className: "m-2" }) : label}
    </NavLink>
  )
}
