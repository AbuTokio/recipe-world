import { useNavigate, useParams } from "react-router"
import { RecipeCard } from "../../components/recipe-card/RecipeCard"
import { useUser } from "../../hooks/ContextHooks"
import { useEffect, useState } from "react"
import type { Recipe } from "../../interfaces/Recipe"
import { getFavoriteRecipesByUserId, getRecipesByUserId } from "../../functions/GetRecipes"
import type { User } from "../../interfaces/User"
import { Calendar, LoaderCircle, UserCheck, User as UserIcon, UserPlus } from "lucide-react"
import { getUserById } from "../../functions/GetUser"
import toast from "react-hot-toast"
import Skeleton from "../../components/skeleton/Skeleton"
import { Follow, GetFollowers, GetFollowing, Unfollow } from "../../functions/GetFollowers"
import { Button } from "../../components/button/Button"
import { FormatDate } from "../../utils/FormatDate"
import type { Followers } from "../../interfaces/Followers"

export default function User() {
  const [isOwnPage, setIsOwnPage] = useState(false)
  const [pageOwner, setPageOwner] = useState<User | null>(null)
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [followers, setFollowers] = useState<Followers[]>([])
  const [following, setFollowing] = useState<Followers[]>([])
  const [favorites, setFavorites] = useState(0)
  const [followingUser, setFollowingUser] = useState(false)
  const [loadingFollowState, setLoadingFollowState] = useState(false)

  const navigate = useNavigate()

  const { user } = useUser()
  const { userId } = useParams()

  const fetchUserRecipes = async () => {
    if (userId) {
      const userRecipes = await getRecipesByUserId(userId)
      setUserRecipes(userRecipes)
    }
  }

  const fetchFollowerData = async () => {
    if (userId) {
      const followers = await GetFollowers(userId)
      const following = await GetFollowing(userId)
      setFollowers(followers)
      setFollowing(following)
      setFollowingUser(user ? followers.some((follower) => follower.follower === user.id) : false)
    }
  }

  const fetchFavorites = async () => {
    const favorites = await getFavoriteRecipesByUserId(userId!)
    setFavorites(favorites.length)
  }

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
      fetchUserRecipes()
      fetchFollowerData()
      fetchFavorites()
      setLoading(false)
    }
  }, [pageOwner])

  useEffect(() => {
    if (userId === user?.id) setIsOwnPage(true)
  }, [userRecipes])

  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="mb-8 md:mb-12 container mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-8 items-center">
          <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg w-fit">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div
                className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-primary-foreground flex-shrink-0 overflow-hidden ${
                  pageOwner?.img_url && "border-2 border-primary"
                }`}>
                {loading ? (
                  <Skeleton />
                ) : pageOwner?.img_url ? (
                  <img src={pageOwner.img_url} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-12 h-12 md:w-16 md:h-16" />
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="mb-2">{loading ? <Skeleton height={50} /> : `${pageOwner?.username}`}</h1>
                <p className="text-muted-foreground mb-4">Food Enthusiast & Home Chef</p>

                <div className="flex flex-col md:flex-row gap-4 text-muted-foreground">
                  {pageOwner?.created_at && (
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      {loading ? (
                        <Skeleton height={16} width={200} />
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Joined {FormatDate(pageOwner.created_at)}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {!isOwnPage && (
                <div className="flex gap-3">
                  <Button
                    variant={followingUser ? "secondary" : "primary"}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                    onClick={async () => {
                      if (!user?.id || !pageOwner?.id) return
                      setLoadingFollowState(true)
                      if (followingUser) {
                        await Unfollow(user.id, pageOwner.id)
                        setFollowingUser(false)
                      } else {
                        await Follow(user.id, pageOwner.id)
                        setFollowingUser(true)
                      }
                      const followers = await GetFollowers(pageOwner.id)
                      setFollowers(followers)
                      setLoadingFollowState(false)
                    }}>
                    <>
                      {loadingFollowState ? (
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                      ) : followingUser ? (
                        <UserCheck className="w-4 h-4" />
                      ) : (
                        <UserPlus className="w-4 h-4" />
                      )}
                      <span className="hidden sm:inline">{followingUser ? "Following" : "Follow"}</span>
                    </>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="container">
            <div className="flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {loading ? (
                  <>
                    {[1, 2, 3, 4].map((n) => (
                      <Skeleton
                        key={n}
                        className="flex flex-col aspect-square md:aspect-auto md:min-h-30 bg-card rounded-xl border border-border p-6 text-center"
                      />
                    ))}
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="flex flex-col aspect-square md:aspect-auto md:min-h-30 bg-card rounded-xl border border-border p-6 text-center"
                      // onClick={() => navigate("/recipes/favorites")}
                    >
                      <div className="text-primary mb-2">{favorites}</div>
                      <p className="text-muted-foreground">Recipes Saved</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex flex-col aspect-square md:aspect-auto md:min-h-30 bg-card rounded-xl border border-border p-6 text-center"
                      // onClick={() => navigate(`/recipes/user/${user?.id}`)}
                    >
                      <div className="text-primary mb-2">{userRecipes.length}</div>
                      <p className="text-muted-foreground">Recipes Created</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex flex-col aspect-square md:aspect-auto md:min-h-30 bg-card rounded-xl border border-border p-6 text-center"
                      onClick={() => {
                        if (user?.id) navigate(`/user/${pageOwner?.id}/followers`)
                        else toast.error("You need to be logged in to view followers")
                      }}>
                      <div className="text-primary mb-2">{followers.length}</div>
                      <p className="text-muted-foreground">Followers</p>
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex flex-col aspect-square md:aspect-auto md:min-h-30 bg-card rounded-xl border border-border p-6 text-center"
                      onClick={() => {
                        if (user?.id) navigate(`/user/${pageOwner?.id}/following`)
                        else toast.error("You need to be logged in to view following")
                      }}>
                      <div className="text-primary mb-2">{following.length}</div>
                      <p className="text-muted-foreground">Following</p>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

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
