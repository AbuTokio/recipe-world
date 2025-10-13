import type { Recipe } from "../interfaces/Recipe"
import supabase from "../utils/supabase"

export async function getAllRecipes(): Promise<Recipe[]> {
  const { data: recipes, error } = await supabase.from("recipes").select("*")

  if (error) console.error(error)

  return recipes as Recipe[]
}

export async function getRecipesFromCategory(categoryId: string): Promise<Recipe[]> {
  const { data: recipes, error } = await supabase.from("recipes").select("*").eq("category_id", categoryId)

  if (error) console.error(error)

  return recipes as Recipe[]
}

export async function getRecipesWithCategory(categoryId: string): Promise<Recipe[]> {
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select("id, name, description, servings, categories:category_id(*)")
    .eq("category_id", categoryId)

  if (error) console.error(error)

  return recipes as unknown as Recipe[]
}
