import type React from "react"
import { userContext } from "./Contexts"
import type { User } from "../interfaces/User"
import { useEffect, useState } from "react"
import supabase from "../utils/supabase"
import type { Favorite } from "../interfaces/Favorites"

export interface UserContextProps {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  favorites: Favorite[]
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>
}

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<Favorite[]>([])

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
      // setUser(session?.user as unknown as User) // Bug: wenn man das fenster minimiert und wieder maximiert, dann sind die user daten weg
      setIsLoggedIn(!!session?.user)
      setLoading(false)
    })

    // setLoading(false)

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const value: UserContextProps = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    loading,
    favorites,
    setFavorites,
  }
  return <userContext.Provider value={value}>{children}</userContext.Provider>
}
