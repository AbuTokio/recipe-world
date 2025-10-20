import type { Followers } from "../interfaces/Followers"
import supabase from "../utils/supabase"

export async function GetFollowers(userId: string): Promise<Followers[]> {
  const { data, error } = await supabase.from("followers").select("*").eq("followed_by", userId)

  if (error) {
    console.error("Error fetching followers:", error)
    return []
  }

  return data || []
}

export async function GetFollowing(userId: string): Promise<Followers[]> {
  const { data, error } = await supabase.from("followers").select("*").eq("follower", userId)
  if (error) {
    console.error("Error fetching following:", error)
    return []
  }
  return data || []
}

export async function Follow(userId: string, targetUserId: string): Promise<void> {
  if (userId !== targetUserId) {
    const { error } = await supabase.from("followers").insert({
      follower: userId,
      followed_by: targetUserId,
    })
    if (error) {
      console.error("Error following user:", error)
    }
  }
}

export async function Unfollow(userId: string, targetUserId: string): Promise<void> {
  if (userId !== targetUserId) {
    const { error } = await supabase.from("followers").delete().eq("follower", userId).eq("followed_by", targetUserId)
    if (error) {
      console.error("Error unfollowing user:", error)
    }
  }
}
