import type { Recipe } from "../interfaces/Recipe"
import supabase from "../utils/supabase"

export async function getRecipes(): Promise<Recipe[]> {
  const { data: recipes, error } = await supabase.from("recipes").select("*")

  if (error) console.error(error)

  return recipes as Recipe[]
}
