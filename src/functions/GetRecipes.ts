import type { Favorite } from "../interfaces/Favorites"
import type { Ingredient } from "../interfaces/Ingredient"
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
    .select("(*), categories:category_id(*)")
    .eq("category_id", categoryId)

  if (error) console.error(error)

  return recipes as unknown as Recipe[]
}

export async function getIngredientsByRecipeId(recipeId: string): Promise<Ingredient[]> {
  const { data: recipe, error } = await supabase
    .from("ingredients")
    .select("*,  recipes:recipe_id(*, categories:category_id(*), users:user_id(*))")
    .eq("recipe_id", recipeId)

  if (error) console.error(error)

  return recipe as unknown as Ingredient[]
}

export async function getRecipesByUserId(userId: string): Promise<Recipe[]> {
  const { data: recipes, error } = await supabase.from("recipes").select("*, users:user_id(*)").eq("user_id", userId)
  if (error) console.error(error)
  return recipes as Recipe[]
}

export async function getFavoriteRecipesByUserId(userId: string): Promise<Favorite[]> {
  const { data: favorite } = await supabase.from("favorites").select("*").eq("user_id", userId).single()

  const { data: items, error } = await supabase
    .from("favorites_items")
    .select("id, recipes:recipe_id(*)")
    .eq("favorites_id", favorite?.id)

  if (error) console.error(error)

  return items as unknown as Favorite[]
}
