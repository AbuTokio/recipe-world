import type { Category } from "./Category"

export interface Recipe {
  id: string
  name: string
  description: string
  servings: number
  instructions: string
  categories: Category
  created_at: string
}
