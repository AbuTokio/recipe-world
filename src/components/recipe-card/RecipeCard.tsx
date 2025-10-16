import { Users, Heart, LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import type { Recipe } from "../../interfaces/Recipe"
import { useUser } from "../../hooks/ContextHooks"
import toast from "react-hot-toast"
import { toggleFavorite } from "../../functions/ToggleFavorites"

interface RecipeCardProps {
  recipe: Recipe
  imageUrl: string
}

export function RecipeCard({ recipe, imageUrl }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { user, favorites, fetchFavorites } = useUser()

  useEffect(() => {
    if (user && favorites.some((fav) => fav.recipes.id === recipe.id)) {
      setIsFavorite(true)
    }
  }, [favorites])

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!user) {
      toast.error("Please log in to add favorites")
      return
    }
    try {
      if (!user?.id) throw new Error("User ID is undefined")
      await toggleFavorite(recipe.id, user.id)
      setIsFavorite(!isFavorite)
      toast.success(isFavorite ? "Removed from favorites" : "Added to favorites")
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    }
    await fetchFavorites()
    setIsLoading(false)
  }

  const handleCardClick = () => {
    navigate(`/recipes/detail/${recipe.id}`)
  }

  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-md dark:shadow-border/30 transition-all duration-300 cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          onClick={handleCardClick}
          src={imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />

        <button
          onClick={(e) => {
            if (!isLoading) handleFavoriteClick(e)
          }}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center hover:bg-card transition-colors cursor-pointer"
          aria-label="Add to favorites">
          {isLoading ? (
            <LoaderCircle className={`w-5 h-5 transition-colors text-primary animate-spin`} />
          ) : (
            <Heart
              className={`w-5 h-5 transition-colors cursor-pointer ${
                isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
          )}
        </button>
      </div>

      <div className="p-5 md:p-6" onClick={handleCardClick}>
        <h3 className="mb-2 group-hover:text-primary transition-colors">{recipe.name}</h3>

        <p className="text-muted-foreground mb-4 line-clamp-2">{recipe.description}</p>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>
    </div>
  )
}
