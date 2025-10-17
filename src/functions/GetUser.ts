import type { User } from "../interfaces/User"
import supabase from "../utils/supabase"

export async function getUserById(userId: string): Promise<User | null> {
  const { data: user, error } = await supabase.from("users").select("*").eq("id", userId).single()
  if (error) {
    console.error("Fehler beim Abrufen des Benutzers:", error)
    return null
  }
  console.log(user)
  return user as User
}
