import type { Recipe } from "./Recipe"

export interface Ingredient {
  id: string
  recipes?: Recipe
  recipe_id?: string
  name: string
  quantity?: number | null
  unit?: string | null
  additional_info?: string | null
  created_at?: string
}
