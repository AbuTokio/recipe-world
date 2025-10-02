import { RecipeCard } from "../../components/recipe-card/RecipeCard"

export default function Home() {
  const popularRecipes = [
    {
      title: "Classic Italian Pasta Carbonara",
      description:
        "Creamy, authentic Italian pasta with crispy pancetta, eggs, and Parmigiano-Reggiano cheese. A Roman classic that's ready in just 20 minutes.",
      imageUrl:
        "https://images.unsplash.com/photo-1749169337822-d875fd6f4c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW4lMjBmb29kfGVufDF8fHx8MTc1OTMyMTgyMXww&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: "20 min",
      servings: 4,
      difficulty: "Easy" as const,
    },
    {
      title: "Grilled Lemon Herb Chicken",
      description:
        "Juicy grilled chicken marinated in fresh herbs, garlic, and lemon. Perfect for a healthy weeknight dinner with roasted vegetables.",
      imageUrl:
        "https://images.unsplash.com/photo-1532550907401-a500c9a57435?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzU5Mjg2MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: "35 min",
      servings: 6,
      difficulty: "Medium" as const,
    },
    {
      title: "Decadent Chocolate Lava Cake",
      description:
        "Rich, molten chocolate cake with a gooey center that flows like lava. The perfect indulgent dessert for chocolate lovers.",
      imageUrl:
        "https://images.unsplash.com/photo-1644158776192-2d24ce35da1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NTkzMzEwMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      cookTime: "25 min",
      servings: 2,
      difficulty: "Hard" as const,
    },
  ]

  return (
    <>
      <section className="-m-4 px-12 py-24 md:px-40 lg:py-20 bg-[url('/img/hero-light.webp')] dark:bg-[url('/img/hero.webp')] bg-cover bg-center bg-background/70 bg-blend-multiply">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="mb-4">Welcome to Recipe World</h1>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Explore thousands of delicious recipes, save your favorites, and share your culinary creations with food
            lovers around the world.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 className="mb-2">Popular Recipes</h2>
              <p className="text-muted-foreground">Trending dishes loved by our community</p>
            </div>
            <a
              href="#"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity hidden md:inline-block">
              View All
            </a>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {popularRecipes.map((recipe, index) => (
              <RecipeCard key={index} {...recipe} />
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-8 text-center md:hidden">
            <a
              href="#"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
              View All Recipes
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
