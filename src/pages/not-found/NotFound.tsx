import { useNavigate } from "react-router"
import { Button } from "../../components/button/Button"
import { Logo } from "../../components/logo/Logo"

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Logo Icon */}
        <div className="mb-8 flex justify-center">
          <div className="opacity-50 text-left">
            <Logo size="large" />
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-[8rem] leading-none bg-gradient-to-r from-primary via-primary-dark to-destructive bg-clip-text text-transparent">
            404
          </h1>
        </div>

        <h2 className="mb-4">Oops! This Recipe Doesn't Exist</h2>

        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like this dish isn't on our menu. The page you're looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="bg-accent/20 border border-accent/30 rounded-xl p-6 mb-8 max-w-md mx-auto">
          <p className="text-accent-foreground italic">
            "We've searched all the ingredients, but couldn't find what you're cooking up!"
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={() => navigate("/home")} variant="primary" size="lg">
            Back to Home
          </Button>
          <Button onClick={() => navigate("/recipes")} variant="secondary" size="lg">
            Browse Recipes
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">Lost? Try exploring our categories from the recipes page.</p>
      </div>
    </div>
  )
}
