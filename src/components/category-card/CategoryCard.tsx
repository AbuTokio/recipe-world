import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { getRecipesFromCategory } from "../../functions/GetRecipes"
import type { Category } from "../../interfaces/Category"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [recipeCount, setRecipeCount] = useState<number>(0)

  useEffect(() => {
    const recipeCount = async () => {
      const recipes = await getRecipesFromCategory(category.id)
      setRecipeCount(recipes.length)
    }
    recipeCount()
  }, [])

  return (
    <Link to={`/recipes/${category.id}`}>
      <article className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-md dark:shadow-border/30 transition-all duration-300 cursor-pointer">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={category.img_url || "https://placehold.co/640x640?text=no+image"}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <h3 className="text-white mb-2">{category.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-white/70">
                {recipeCount} {recipeCount === 1 ? "recipe" : "recipes"}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-primary transition-colors">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
