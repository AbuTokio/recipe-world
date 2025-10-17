import { Users, Heart, Calendar, Edit, LoaderCircle, User } from "lucide-react"
import { useEffect, useState } from "react"
import { getIngredientsByRecipeId } from "../../../functions/GetRecipes"
import { useNavigate, useParams } from "react-router"
import type { Ingredient } from "../../../interfaces/Ingredient"
import { Button } from "../../../components/button/Button"
import { FormatDate } from "../../../utils/FormatDate"
import toast from "react-hot-toast"
import { useUser } from "../../../hooks/ContextHooks"
import { toggleFavorite } from "../../../functions/ToggleFavorites"
import Separator from "../../../components/separator/Separator"

export default function Detail() {
  const { recipeId } = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null)
  const navigate = useNavigate()

  const { user, favorites, fetchFavorites } = useUser()

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!user) {
      toast.error("Please log in to add favorites")
      return
    }
    try {
      if (!user?.id) throw new Error("User ID is undefined")
      await toggleFavorite(recipeId!, user.id)
      setIsFavorite(!isFavorite)
      toast.success(isFavorite ? "Removed from favorites" : "Added to favorites")
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    }
    await fetchFavorites()
    setIsLoading(false)
  }

  useEffect(() => {
    if (user && favorites.some((fav) => fav.recipes.id === recipeId)) {
      setIsFavorite(true)
    }
  }, [favorites])

  useEffect(() => {
    if (recipeId) {
      const getIngredientsData = async () => {
        const ingredients = await getIngredientsByRecipeId(recipeId)
        setIngredients(ingredients)
      }
      getIngredientsData()
    }
  }, [recipeId])

  // Parse instructions into steps
  const instructionSteps = ingredients?.[0]?.recipes?.instructions
    .split(/\d+\./)
    .filter((step) => step.trim().length > 0)
    .map((step) => step.trim())

  return (
    <div className="min-h-screen py-12 md:py-16 lg:py-20">
      {/* Hero Image Section */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-muted">
        <img
          src={`/img/recipes/${ingredients?.[0]?.recipes?.id}.webp`}
          alt={ingredients?.[0]?.recipes?.name}
          className="w-full h-full object-cover"
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            if (!isLoading) handleFavoriteClick(e)
          }}
          className="absolute top-6 right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-card/90 backdrop-blur flex items-center justify-center hover:bg-card transition-colors shadow-lg"
          aria-label="Add to favorites">
          {isLoading ? (
            <LoaderCircle className={`w-5 h-5 transition-colors text-primary animate-spin`} />
          ) : (
            <Heart
              className={`w-6 h-6 transition-colors ${
                isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
          )}
        </button>
      </div>

      {/* Recipe Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
              {/* TODO: wrap in a Badge Component */}
              {ingredients?.[0]?.recipes?.categories?.name}
              {ingredients?.[0].recipes?.users?.id !== null && ingredients?.[0].recipes?.users?.id === user?.id && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (user) navigate(`/recipes/edit/${recipeId}`)
                    else {
                      toast.error("Please log in to edit a recipe")
                      navigate("/login")
                    }
                  }}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Recipe
                </Button>
              )}
            </div>

            <h1 className="mb-4">{ingredients?.[0]?.recipes?.name}</h1>

            <p className="text-muted-foreground mb-6">{ingredients?.[0]?.recipes?.description}</p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{ingredients?.[0]?.recipes?.servings} servings</span>
              </div>
              <div
                className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer"
                onClick={() => navigate(`/recipes/user/${ingredients?.[0]?.recipes?.users?.id}`)}>
                <User className="w-5 h-5" />
                <span>{ingredients?.[0]?.recipes?.users?.username || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{FormatDate(String(ingredients?.[0]?.recipes?.created_at))}</span>
              </div>
            </div>
          </div>

          <Separator className="mb-8 md:mb-12" />

          {/* Two Column Layout for Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Ingredients Section */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-6">
                <h2 className="mb-6">Ingredients</h2>
                <div className="space-y-4">
                  {ingredients?.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          {ingredient.quantity && (
                            <span className="font-medium">
                              {ingredient.quantity}
                              {ingredient.unit && ` ${ingredient.unit}`}
                            </span>
                          )}
                          <span className={ingredient.quantity ? "" : "font-medium"}>{ingredient.name}</span>
                        </div>
                        {ingredient.additional_info && (
                          <p className="text-muted-foreground mt-1">{ingredient.additional_info}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="lg:col-span-2">
              <h2 className="mb-6">Instructions</h2>
              <div className="space-y-6">
                {instructionSteps?.map((step, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
