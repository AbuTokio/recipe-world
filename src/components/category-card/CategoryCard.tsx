import { ArrowRight } from "lucide-react"

interface CategoryCardProps {
  name: string
  description: string
  imageUrl: string
  recipeCount: number
  onClick: () => void
}

export function CategoryCard({ name, description, imageUrl, recipeCount, onClick }: CategoryCardProps) {
  return (
    <article
      onClick={onClick}
      className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-md dark:shadow-border/30 transition-all duration-300 cursor-pointer">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-white mb-2">{name}</h3>
          <p className="text-white/80 mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-white/70">{recipeCount} recipes</span>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-primary transition-colors">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
