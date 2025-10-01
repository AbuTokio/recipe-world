import type { Recipe } from "../interfaces/Recipes"
import supabase from "../utils/supabase"

export async function getRecipes(): Promise<Recipe[]> {
  const { data: recipes, error } = await supabase.from("Recipes").select("*")

  if (error) console.error(error)

  return recipes as Recipe[]
}
