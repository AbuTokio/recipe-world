import supabase from "../utils/supabase"

export async function toggleFavorite(recipeId: string, userId: string): Promise<void> {
  const { data: favorite } = await supabase.from("favorites").select("*").eq("user_id", userId).single()
  if (!favorite) {
    console.error("Favoritenliste nicht gefunden")
    return
  }
  const favoritesId = favorite.id
  const { data: existingFavoriteItem } = await supabase
    .from("favorites_items")
    .select("*")
    .eq("favorites_id", favoritesId)
    .eq("recipe_id", recipeId)
  if (existingFavoriteItem?.length) {
    const { error } = await supabase.from("favorites_items").delete().eq("id", existingFavoriteItem?.[0].id)
    if (error) console.error("Fehler beim Entfernen des Favoriten:", error)
  } else {
    const { error } = await supabase.from("favorites_items").insert({
      favorites_id: favoritesId,
      recipe_id: recipeId,
    })
    if (error) console.error("Fehler beim Hinzufügen des Favoriten:", error)
  }
}
