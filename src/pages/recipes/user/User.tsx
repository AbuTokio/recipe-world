import { useNavigate, useParams } from "react-router"
import { RecipeCard } from "../../../components/recipe-card/RecipeCard"
import { useUser } from "../../../hooks/ContextHooks"
import { useEffect, useState } from "react"
import type { Recipe } from "../../../interfaces/Recipe"
import { getRecipesByUserId } from "../../../functions/GetRecipes"
import type { User } from "../../../interfaces/User"
import { getUserById } from "../../../functions/GetUser"
import toast from "react-hot-toast"

export default function User() {
  const [isOwnPage, setIsOwnPage] = useState(false)
  const [pageOwner, setPageOwner] = useState<User | null>(null)
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([])

  const navigate = useNavigate()

  const { user } = useUser()
  const { userId } = useParams()

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        const pageOwner = await getUserById(userId)
        if (!pageOwner) {
          toast.error("User does not exist")
          navigate("/home")
        }
        setPageOwner(pageOwner)
      }
      fetchUser()
    }
  }, [])

  useEffect(() => {
    if (pageOwner) {
      const fetchUserRecipes = async () => {
        if (userId) {
          const userRecipes = await getRecipesByUserId(userId)
          setUserRecipes(userRecipes)
        }
      }
      fetchUserRecipes()
    }
  }, [pageOwner])

  useEffect(() => {
    if (userId === user?.id) setIsOwnPage(true)
  }, [userRecipes])

  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <h2 className="mb-2">{pageOwner?.username}'s Recipes</h2>
              <p className="text-muted-foreground">
                {isOwnPage ? "You have" : `${pageOwner?.username} has`} shared {userRecipes.length}{" "}
                {userRecipes?.length === 1 ? "recipe" : "recipes"}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {userRecipes.map((rec) => (
              <RecipeCard key={rec.id} recipe={{ ...rec }} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
