import type { Ingredient } from "../interfaces/Ingredient"
import type { Recipe } from "../interfaces/Recipe"
import supabase from "../utils/supabase"

export async function addRecipe(recipe: Recipe, ingredient: Ingredient) {
  const { data: recipes, error: recipesError } = await supabase.from("recipes").insert({ ...recipe })

  if (recipesError) {
    console.error("Error on adding recipe:", recipesError)
  } else {
    // const {data: ingredients, error: ingredientError} = await supabase.from("ingredients").insert({...ingredient}).eq("recipe_id", recipes[0].id);
  }
}
