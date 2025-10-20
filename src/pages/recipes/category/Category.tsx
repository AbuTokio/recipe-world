import { useParams } from "react-router"
import { RecipeCard } from "../../../components/recipe-card/RecipeCard"
import { useEffect, useState } from "react"
import type { Recipe } from "../../../interfaces/Recipe"
import { getRecipesFromCategory } from "../../../functions/GetRecipes"
import type { Category } from "../../../interfaces/Category"
import { getCategoryById } from "../../../functions/GetCategories"

export default function Category() {
  const { categoryId } = useParams()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [category, setCategory] = useState<Category | null>(null)

  const getRecipeData = async () => {
    if (categoryId) {
      const recipes = await getRecipesFromCategory(categoryId)
      setRecipes(recipes)
    }
  }

  const getCategoryData = async () => {
    if (categoryId) {
      const category = await getCategoryById(categoryId)
      setCategory(category)
    }
  }

  useEffect(() => {
    getRecipeData()
    getCategoryData()
  }, [categoryId])

  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 className="mb-2">{category?.name}</h2>
              <p className="text-muted-foreground">
                Explore {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} in {category?.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={{ ...recipe }} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
