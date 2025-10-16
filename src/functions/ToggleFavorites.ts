import supabase from "../utils/supabase"

export async function toggleFavorite(recipeId: string, userId: string): Promise<void> {
  // Zuerst die Favoritenliste des Benutzers abrufen
  console.log("userId:", userId)
  const { data: favorite } = await supabase.from("favorites").select("*").eq("user_id", userId).single()
  if (!favorite) {
    console.error("Favoritenliste nicht gefunden")
    return
  }
  const favoritesId = favorite.id
  // Überprüfen, ob das Rezept bereits in den Favoriten ist
  const { data: existingFavoriteItem } = await supabase
    .from("favorites_items")
    .select("*")
    .eq("favorites_id", favoritesId)
    .eq("recipe_id", recipeId)
  if (existingFavoriteItem?.length) {
    // Wenn ja, entfernen
    const { error } = await supabase.from("favorites_items").delete().eq("id", existingFavoriteItem?.[0].id)
    if (error) console.error("Fehler beim Entfernen des Favoriten:", error)
    else console.log("Favorit entfernt")
  } else {
    // Wenn nein, hinzufügen
    const { error } = await supabase.from("favorites_items").insert({
      favorites_id: favoritesId,
      recipe_id: recipeId,
    })
    if (error) console.error("Fehler beim Hinzufügen des Favoriten:", error)
    else console.log("Favorit hinzugefügt")
  }
}
