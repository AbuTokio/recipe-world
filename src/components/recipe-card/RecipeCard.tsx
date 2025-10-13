import { Users, Heart } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import type { Recipe } from "../../interfaces/Recipe"

interface RecipeCardProps {
  recipe: Recipe
  imageUrl: string
}

export function RecipeCard({ recipe, imageUrl }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Link
      to={`/recipes/detail/${recipe.id}`}
      className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-md dark:shadow-border/30 transition-all duration-300 cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={recipe.name}
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
        <h3 className="mb-2 group-hover:text-primary transition-colors">{recipe.name}</h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">{recipe.description}</p>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
