import { User, Mail, Calendar, Settings, LogOut, Save } from "lucide-react"
import { useUser } from "../../hooks/ContextHooks"
import { useEffect, useRef, useState } from "react"
import supabase from "../../utils/supabase"
import { FormatDate } from "../../utils/FormatDate"
import { useNavigate } from "react-router"
import { Button } from "../../components/button/Button"
import Skeleton from "../../components/skeleton/Skeleton"
import { uploadProfilePicture } from "../../functions/UploadPicture"
import type { Recipe } from "../../interfaces/Recipe"
import { getRecipesByUserId } from "../../functions/GetRecipes"
import { GetFollowers, GetFollowing } from "../../functions/GetFollowers"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [newUsername, setNewUsername] = useState("")
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([])
  const [followers, setFollowers] = useState<number>(0)
  const [following, setFollowing] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const usernameChangeRef = useRef<HTMLInputElement | null>(null)

  const { user, setUser, setIsLoggedIn, favorites } = useUser()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log("Logout funktioniert nicht", error)
    }
    setIsLoggedIn(false)
    navigate("/home")
  }

  const fetchUserRecipes = async () => {
    if (user?.id) {
      const userRecipes = await getRecipesByUserId(user.id)
      setUserRecipes(userRecipes)
    }
  }

  const fetchFollowerData = async () => {
    if (user?.id) {
      const followersCount = await GetFollowers(user.id)
      const followingCount = await GetFollowing(user.id)
      setFollowers(followersCount.length)
      setFollowing(followingCount.length)
    }
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }, [user])

  useEffect(() => {
    if (profilePicture) {
      handleUploadProfilePicture()
    }
  }, [profilePicture])

  useEffect(() => {
    fetchUserRecipes()
    fetchFollowerData()
  }, [user])

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    setProfilePicture(file)
  }

  async function handleUploadProfilePicture() {
    console.log(profilePicture)
    console.log(user)
    if (!profilePicture || !user) return null

    try {
      const imgUrl = await uploadProfilePicture(profilePicture)

      if (imgUrl) {
        setUser((prev) => (prev ? { ...prev, img_url: imgUrl } : prev))

        await supabase.from("users").update({ img_url: imgUrl }).eq("id", user.id)
      }
    } catch (error) {
      console.error("Fehler beim Foto upload", error)
    }
  }

  const handleUsernameChange = async () => {
    if (user && newUsername !== user.username) {
      const { error } = await supabase.from("users").update({ username: newUsername }).eq("id", user.id)

      if (error) {
        console.error("Fehler beim Speichern", error)
      } else {
        setUser((prev) => (prev ? { ...prev, username: newUsername } : prev))
      }
    }
  }

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
                <div
                  className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-primary-foreground flex-shrink-0 overflow-hidden ${
                    user?.img_url && "border-2 border-primary"
                  }`}>
                  {loading ? (
                    <Skeleton />
                  ) : user?.img_url ? (
                    <img src={user.img_url} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 md:w-16 md:h-16" />
                  )}
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                      <button
                        type="button"
                        className="absolute bottom-0 left-0 right-0 bg-card-foreground text-muted text-xs px-2 py-1 rounded hover:bg-accent hover:text-card-foreground cursor-pointer"
                        onClick={handleButtonClick}>
                        Upload
                      </button>
                    </>
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
                      ) : isEditing ? (
                        <>
                          <input
                            ref={usernameChangeRef}
                            type="text"
                            defaultValue={user?.username}
                            onChange={(e) => {
                              setNewUsername(e.target.value)
                            }}
                            className="px-2 py-1 border border-border rounded bg-card text-primary focus:outline-none focus:ring-2 focus:ring-primary w-full"
                          />
                        </>
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
                    onClick={() => {
                      if (isEditing) {
                        handleUsernameChange()
                      }
                      setIsEditing(!isEditing)
                    }}>
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4" />
                        <span className="hidden sm:inline">Save</span>
                      </>
                    ) : (
                      <>
                        <Settings className="w-4 h-4" />
                        <span className="hidden sm:inline">Settings</span>
                      </>
                    )}
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
          <h3 className="text-muted-foreground mb-8">Click for more details</h3>

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
                  className="flex flex-col aspect-square md:aspect-auto md:min-h-30 bg-card rounded-xl border border-border p-6 text-center"
                  onClick={() => navigate(`/recipes/user/${user?.id}`)}>
                  <div className="text-primary mb-2">{userRecipes.length}</div>
                  <p className="text-muted-foreground">Recipes Created</p>
                </Button>
                <Button
                  variant="ghost"
                  className="flex flex-col aspect-square md:aspect-auto md:min-h-30 bg-card rounded-xl border border-border p-6 text-center">
                  <div className="text-primary mb-2">{followers}</div>
                  <p className="text-muted-foreground">Followers</p>
                </Button>
                <Button
                  variant="ghost"
                  className="flex flex-col aspect-square md:aspect-auto md:min-h-30 bg-card rounded-xl border border-border p-6 text-center">
                  <div className="text-primary mb-2">{following}</div>
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
