import { ChefHat } from "lucide-react"

interface IconProps {
  className?: string
  size?: "small" | "default" | "large"
}

export default function Icon({ className, size = "default" }: IconProps) {
  return (
    <div className="relative">
      <div
        className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 blur-sm opacity-75 ${
          size === "small" ? "rounded-xl" : "rounded-2xl"
        }`}></div>
      <div
        className={`relative bg-gradient-to-br from-orange-500 to-red-600 p-2 shadow-lg ${
          size === "small" ? "rounded-xl" : "rounded-2xl"
        }`}>
        <ChefHat className={`${className && className} text-white`} strokeWidth={2} />
      </div>
    </div>
  )
}
