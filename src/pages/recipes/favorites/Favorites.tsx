import { RecipeCard } from "../../../components/recipe-card/RecipeCard"
import { useUser } from "../../../hooks/ContextHooks"

export default function Favorites() {
  const { user, favorites } = useUser()

  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 className="mb-2">{user?.username}'s Favorites</h2>
              <p className="text-muted-foreground">
                You have {favorites?.length} {favorites?.length === 1 ? "recipe" : "recipes"} saved in your favorites.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {favorites.map((fav) => (
              <RecipeCard key={fav.id} recipe={{ ...fav.recipes }} imageUrl={`/img/recipes/${fav.recipes.id}.webp`} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
