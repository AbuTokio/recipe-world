import React, { useEffect, useState } from "react"
import type { Recipe } from "../interfaces/Recipe"
import { mainContext } from "./MainContext"
import { getRecipes } from "../functions/GetRecipes"
import type { Category } from "../interfaces/Category"
import { getCategories } from "../functions/GetCategories"

export interface MainContextProps {
  recipes: Recipe[]
  categories: Category[]
}

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRecipes()
      setRecipes(recipes)
    }

    fetchRecipes()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories()
      setCategories(categories)
    }

    fetchCategories()
  }, [])

  const value: MainContextProps = {
    recipes,
    categories,
  }

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
