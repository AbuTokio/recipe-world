import type { LucideProps } from "lucide-react"
import React from "react"
import { Link } from "react-router"

interface SocialLinkProps {
  to: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  newTab?: boolean
}

export default function SocialLink({ to, icon, newTab = false }: SocialLinkProps) {
  return (
    <Link
      to={to}
      className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
      target={newTab ? "_blank" : "_self"}>
      {React.createElement(icon, { className: "" })}
    </Link>
  )
}
