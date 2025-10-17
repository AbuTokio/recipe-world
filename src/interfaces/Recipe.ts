import type { Category } from "./Category"
import type { User } from "./User"

export interface Recipe {
  id?: string
  name: string
  description: string
  servings: number
  instructions: string
  categories?: Category
  category_id: string
  created_at?: string
  users?: User
  user_id: string | null
}
