import type { Recipe } from "./Recipe"

export interface Favorite {
  id: string
  favorites_id?: string
  recipes: Recipe
}
