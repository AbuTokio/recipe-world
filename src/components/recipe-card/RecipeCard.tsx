import { Clock, Users, Heart } from "lucide-react"
import { useState } from "react"

interface RecipeCardProps {
  title: string
  description: string
  imageUrl: string
  cookTime: string
  servings: number
}

export function RecipeCard({ title, description, imageUrl, cookTime, servings }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <article className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-md dark:shadow-border/30 transition-all duration-300 cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
          aria-label="Add to favorites">
          <Heart
            className={`w-5 h-5 transition-colors cursor-pointer ${
              isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      <div className="p-5 md:p-6">
        <h3 className="mb-2 group-hover:text-primary transition-colors">{title}</h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{cookTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{servings} servings</span>
          </div>
        </div>
      </div>
    </article>
  )
}
