import type React from "react"
import { userContext } from "./Contexts"
import type { User } from "../interfaces/User"
import { useEffect, useState } from "react"
import supabase from "../utils/supabase"
import type { Favorite } from "../interfaces/Favorites"
import { getFavoriteRecipesByUserId } from "../functions/GetRecipes"

export interface UserContextProps {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  favorites: Favorite[]
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>
  fetchUserData: () => Promise<void>
  fetchFavorites: () => Promise<void>
}

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<Favorite[]>([])

  const fetchUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data: userData, error } = await supabase.from("users").select("*").eq("id", user.id)
      if (error) console.error("Fehler beim Laden des Users:", error)
      else setUser(userData?.[0])
    }
    console.log(user)
  }

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true)
      const { data } = await supabase.auth.getSession()
      const session = data?.session
      if (session?.user) {
        setUser(session?.user as unknown as User)
        setIsLoggedIn(true)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
      setLoading(false)
    }
    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as unknown as User)
      setIsLoggedIn(!!session?.user)
      if (session?.user) fetchUserData()
      setLoading(false)
    })

    // setLoading(false)

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchFavorites = async () => {
    if (user?.id) {
      const result = await getFavoriteRecipesByUserId(user.id)
      console.log(result)
      setFavorites(result)
    }
  }

  useEffect(() => {
    if (user) {
      fetchFavorites()
    }
  }, [user])

  const value: UserContextProps = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    loading,
    favorites,
    setFavorites,
    fetchUserData,
    fetchFavorites,
  }
  return <userContext.Provider value={value}>{children}</userContext.Provider>
}
