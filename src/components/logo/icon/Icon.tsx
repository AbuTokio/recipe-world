import { ChefHat } from "lucide-react"

interface IconProps {
  className?: string
}

export default function Icon({ className }: IconProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl blur-sm opacity-75"></div>
      <div className="relative bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-2 shadow-lg">
        <ChefHat className={`${className && className} text-white`} strokeWidth={2} />
      </div>
    </div>
  )
}
