import type { Ingredient } from "../interfaces/Ingredient"
import type { Recipe } from "../interfaces/Recipe"
import supabase from "../utils/supabase"

export async function addRecipe(recipe: Recipe, ingredients: Ingredient[]) {
  const { error } = await supabase.from("recipes").insert({
    name: recipe.name,
    description: recipe.description,
    servings: recipe.servings,
    category_id: recipe.category_id,
    instructions: recipe.instructions,
    user_id: recipe.user_id,
  })
  if (error) {
    console.error("Error on adding recipe:", error)
    return
  }

  const { data } = await supabase
    .from("recipes")
    .select("id")
    .eq("name", recipe.name)
    .eq("user_id", recipe.user_id)
    .eq("instructions", recipe.instructions)
    .eq("description", recipe.description)
    .eq("servings", recipe.servings)
    .eq("category_id", recipe.category_id)
    .single()

  const recipeId = data?.id as string

  await addIngredients(recipeId, ingredients)
}

export async function updateRecipe(recipe: Recipe, ingredients: Ingredient[]) {
  const { error: recipesError } = await supabase
    .from("recipes")
    .update({
      name: recipe.name,
      description: recipe.description,
      servings: recipe.servings,
      category_id: recipe.category_id,
      instructions: recipe.instructions,
      user_id: recipe.user_id,
    })
    .eq("id", recipe.id)
  if (recipesError) {
    console.error("Error on updating recipe:", recipesError)
  }

  const { error: deleteError } = await supabase.from("ingredients").delete().eq("recipe_id", recipe.id)
  if (deleteError) {
    console.error("Error on deleting ingredients:", deleteError)
  }

  await addIngredients(recipe.id!, ingredients)
}

export async function addIngredients(recipeId: string, ingredients: Ingredient[]) {
  for (const ingredient of ingredients) {
    try {
      const { error: ingError } = await supabase.from("ingredients").insert({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        recipe_id: recipeId,
        additional_info: ingredient.additional_info || null,
      })
      if (ingError) {
        throw new Error("Error on adding ingredient:" + ingError.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export async function deleteRecipe(recipeId: string) {
  const { error: ingredientsError } = await supabase.from("ingredients").delete().eq("recipe_id", recipeId)
  if (ingredientsError) {
    console.error("Error on deleting ingredients:", ingredientsError)
  }
  const { error: recipeError } = await supabase.from("recipes").delete().eq("id", recipeId)
  if (recipeError) {
    console.error("Error on deleting recipe:", recipeError)
  }
}
