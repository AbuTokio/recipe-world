import { Link } from "react-router"
import { RecipeCard } from "../../components/recipe-card/RecipeCard"
import { useMain } from "../../hooks/ContextHooks"

export default function Home() {
  const ctx = useMain()

  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 className="mb-2">Popular Recipes</h2>
              <p className="text-muted-foreground">Trending dishes loved by our community</p>
            </div>
            <Link
              to="/recipes"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity hidden md:inline-block">
              View All
            </Link>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ctx.recipes.slice(0, 3).map((recipe) => (
              <RecipeCard
                key={recipe.id}
                title={recipe.name}
                description={recipe.description}
                imageUrl={`/img/recipes/${recipe.id}.webp`}
                servings={recipe.servings}
              />
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/recipes"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              View All Recipes
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
