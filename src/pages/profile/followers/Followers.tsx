import { ArrowLeft, User as UserIcon, UserPlus, UserCheck, LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import type { Followers } from "../../../interfaces/Followers"
import type { User } from "../../../interfaces/User"
import { useNavigate, useParams } from "react-router"
import { useUser } from "../../../hooks/ContextHooks"
import { Follow, GetFollowers, GetFollowing, Unfollow } from "../../../functions/GetFollowers"
import { getUserById } from "../../../functions/GetUser"
import { Button } from "../../../components/button/Button"

export default function Followers() {
  const [followers, setFollowers] = useState<User[]>([])
  const [following, setFollowing] = useState<Followers[]>([])
  const [loadingFollowState, setLoadingFollowState] = useState<string | boolean>(false)
  const [isOwnPage, setIsOwnPage] = useState(false)
  const [pageOwner, setPageOwner] = useState<User | null>(null)

  const navigate = useNavigate()
  const { user } = useUser()
  const { userId } = useParams()

  const fetchFollowerData = async (userId: string) => {
    const followers = await GetFollowers(userId)
    const detailedFollowers = followers.map(async (follower) => {
      const userData: User = (await getUserById(follower.follower)) as User
      return userData
    })
    const following = await GetFollowing(user?.id!)
    setFollowers(await Promise.all(detailedFollowers))
    setFollowing(following)
  }

  const handleFollowToggle = async (targetUserId: string) => {
    setLoadingFollowState(targetUserId)
    if (!user?.id) return
    const isFollowing = following.find((f) => f.followed_by === targetUserId)
    if (isFollowing) {
      await Unfollow(user.id, targetUserId)
    } else {
      await Follow(user.id, targetUserId)
    }
    if (isOwnPage) {
      fetchFollowerData(user?.id!)
    } else {
      fetchPageOwner()
      fetchFollowerData(userId!)
    }
    setLoadingFollowState(false)
  }

  const fetchPageOwner = async () => {
    const ownerData = (await getUserById(userId!)) as User
    setPageOwner(ownerData)
  }

  const handleUserClick = (targetUserId: string) => {
    navigate(`/user/${targetUserId}`)
  }

  useEffect(() => {
    if (userId && user?.id && userId === user?.id) setIsOwnPage(true)
    if (!userId && user?.id) setIsOwnPage(true)
    if (isOwnPage) {
      fetchFollowerData(user?.id!)
    } else {
      fetchPageOwner()
      fetchFollowerData(userId!)
    }
  }, [userId, user?.id, isOwnPage])

  return (
    <>
      {/* Header */}
      <section className="py-12 md:py-16 lg:py-20 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to {!isOwnPage && `${pageOwner?.username}'s`} Profile</span>
            </button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="mb-2">{!isOwnPage && `${pageOwner?.username}'s`} Followers</h1>
                <p className="text-muted-foreground">
                  {followers.length} people following {!isOwnPage ? pageOwner?.username : "you"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Followers List */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {followers.map((follower) => (
                <div
                  key={follower.id}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-primary-foreground flex-shrink-0 overflow-hidden cursor-pointer ${
                        follower?.img_url && "border-2 border-primary"
                      }`}
                      onClick={() => handleUserClick(follower.id!)}>
                      {follower.img_url ? (
                        <img src={follower.img_url} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <UserIcon className="w-8 h-8 text-foreground" />
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                        <div
                          className="hover:text-primary-light cursor-pointer"
                          onClick={() => handleUserClick(follower.id!)}>
                          <h3 className="mb-1">
                            {follower.firstname} {follower.lastname}
                          </h3>
                          <p className="text-muted-foreground text-sm">{follower.username}</p>
                        </div>

                        {/* Follow Button */}
                        {user?.id !== follower.id && (
                          <Button
                            onClick={() => handleFollowToggle(follower.id!)}
                            variant={following.find((f) => f.followed_by === follower.id) ? "secondary" : "primary"}
                            size="md">
                            {following.find((f) => f.followed_by === follower.id) ? (
                              loadingFollowState === follower.id ? (
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                              ) : (
                                <UserCheck className="w-4 h-4" />
                              )
                            ) : loadingFollowState === follower.id ? (
                              <LoaderCircle className="w-4 h-4 animate-spin" />
                            ) : (
                              <UserPlus className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State - if no followers */}
            {followers.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  {isOwnPage ? (
                    <>
                      {user?.img_url ? (
                        <img src={user.img_url} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <UserIcon className="w-10 h-10 text-foreground" />
                      )}
                    </>
                  ) : (
                    <>
                      {pageOwner?.img_url ? (
                        <img src={pageOwner.img_url} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <UserIcon className="w-10 h-10 text-foreground" />
                      )}
                    </>
                  )}
                </div>
                <h3 className="mb-2">No Followers Yet</h3>
                <p className="text-muted-foreground mb-6">Share your recipes to gain followers!</p>
                <Button onClick={() => navigate("/recipes/add")} variant="primary">
                  Create a Recipe
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
