import type { Category } from "../interfaces/Category"
import supabase from "../utils/supabase"

export async function getCategories(): Promise<Category[]> {
  const { data: categories, error } = await supabase.from("categories").select("*")

  if (error) console.error(error)

  return categories as Category[]
}

export async function getCategoryById(categoryId: string): Promise<Category | null> {
  const { data: category, error } = await supabase.from("categories").select("*").eq("id", categoryId).single()
  if (error) console.error(error)

  return category as Category
}
