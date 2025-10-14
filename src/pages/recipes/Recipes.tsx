import { Plus } from "lucide-react"
import { Button } from "../../components/button/Button"
import { CategoryCard } from "../../components/category-card/CategoryCard"
import { useMain } from "../../hooks/ContextHooks"
import { useResponsive } from "../../hooks/ResponsiveHooks"
import { useNavigate } from "react-router"

export default function Recipes() {
  const ctx = useMain()
  const bp = useResponsive()
  const navigate = useNavigate()

  return (
    <>
      {/* Categories Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div className="flex-1">
              <h2 className="mb-2">Explore Categories</h2>
              <p className="text-muted-foreground">Discover recipes by meal type and cuisine</p>
            </div>
            <Button size={!bp.isMd ? "sm" : "md"} onClick={() => navigate("/recipes/add")}>
              <Plus className="w-4 h-4 mr-2" />
              Add Recipe
            </Button>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {ctx.categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                imageUrl={`/img/categories/${category.id}.webp`}
                categoryId={category.id}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
