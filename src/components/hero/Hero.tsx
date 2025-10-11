export default function Hero() {
  return (
    <section className="-m-4 px-12 py-24 md:px-40 lg:py-20 bg-[url('/img/hero-light.webp')] dark:bg-[url('/img/hero.webp')] bg-cover bg-center bg-background/70 bg-blend-multiply">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h1 className="mb-4">Welcome to Recipe World</h1>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Explore thousands of delicious recipes, save your favorites, and share your culinary creations with food
          lovers around the world.
        </p>
      </div>
    </section>
  )
}
