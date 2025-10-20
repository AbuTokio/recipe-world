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

  console.log(recipes)

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
// user 72eeed43-32c7-4366-acbc-355f503efa94
// favorites_id 0c403d31-260a-4cfc-8d5f-d2ed11e7be7f

// 00d3d413-c091-4cf5-9404-e872940cff0b
// 0ee7f7a7-9a80-4df4-b4a9-5b857fc56c11
// 16ca1eab-f478-4afd-b91c-b1b23c9c8ddf
