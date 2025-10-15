import { User, Mail, Calendar, Settings, LogOut } from "lucide-react"
import { useUser } from "../../hooks/ContextHooks"
import { useEffect, useState } from "react"
import supabase from "../../utils/supabase"
import { FormatDate } from "../../utils/FormatDate"
import { useNavigate } from "react-router"
import { Button } from "../../components/button/Button"
import Skeleton from "../../components/skeleton/Skeleton"
import { getFavoriteRecipesByUserId } from "../../functions/GetRecipes"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  const { user, setUser, setIsLoggedIn, favorites, setFavorites } = useUser()
  const navigate = useNavigate()

  const fetchUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    // console.log(user)

    if (user) {
      const { data: userData, error } = await supabase.from("users").select("*").eq("id", user.id)
      if (error) console.error("Fehler beim Laden des Users:", error)
      else setUser(userData?.[0] || null)
    }
  }

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log("Logout funktioniert nicht", error)
    }
    setIsLoggedIn(false)
    navigate("/home")
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchFavorites = async () => {
    if (user?.id) {
      const result = await getFavoriteRecipesByUserId(user.id)
      console.log(result)
      setFavorites(result)
    }
  }

  useEffect(() => {
    fetchFavorites()
    setLoading(false)
  }, [user])

  return (
    <div className="py-12 md:py-16 lg:py-20">
      {/* Header */}
      <section className="">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-lg">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-primary-foreground flex-shrink-0 overflow-hidden">
                  {user?.img_url ? (
                    <img src={user.img_url} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 md:w-16 md:h-16" />
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="mb-2">
                    {loading ? <Skeleton height={50} /> : `${user?.firstname} ${user?.lastname}`}
                  </h1>
                  <p className="text-muted-foreground mb-4">Food Enthusiast & Home Chef</p>

                  <div className="flex flex-col md:flex-row gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      {loading ? (
                        <Skeleton height={16} width={100} />
                      ) : (
                        <>
                          <User className="w-4 h-4" />
                          <span>{user?.username}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      {loading ? (
                        <Skeleton height={16} width={150} />
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          <span>{user?.email}</span>
                        </>
                      )}
                    </div>
                    {user?.created_at && (
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        {loading ? (
                          <Skeleton height={16} width={200} />
                        ) : (
                          <>
                            <Calendar className="w-4 h-4" />
                            <span>Joined {FormatDate(user.created_at)}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                    onClick={() => setIsEditing(!isEditing)}>
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">Settings</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <h2 className="">Your Stats</h2>
          <h3 className="text-muted mb-8">Click for more details</h3>

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
                  onClick={() => navigate("/recipes/favorites")}>
                  <div className="text-primary mb-2">{favorites.length}</div>
                  <p className="text-muted-foreground">Recipes Saved</p>
                </Button>
                <Button
                  variant="ghost"
                  className="flex flex-col aspect-square md:aspect-auto md:min-h-30 bg-card rounded-xl border border-border p-6 text-center">
                  <div className="text-primary mb-2">18</div>
                  <p className="text-muted-foreground">Recipes Created</p>
                </Button>
                <Button
                  variant="ghost"
                  className="flex flex-col aspect-square md:aspect-auto md:min-h-30 bg-card rounded-xl border border-border p-6 text-center">
                  <div className="text-primary mb-2">127</div>
                  <p className="text-muted-foreground">Followers</p>
                </Button>
                <Button
                  variant="ghost"
                  className="flex flex-col aspect-square md:aspect-auto md:min-h-30 bg-card rounded-xl border border-border p-6 text-center">
                  <div className="text-primary mb-2">95</div>
                  <p className="text-muted-foreground">Following</p>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Account Actions */}
      <section className="py-12 md:py-16 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <h3 className="mb-6">Account</h3>

          <div className="space-y-3">
            <Button
              variant="destructive"
              className="w-full flex items-center justify-between p-4 bg-card border border-destructive/50 rounded-lg hover:bg-destructive/10 transition-colors text-destructive"
              onClick={handleLogOut}>
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </div>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
