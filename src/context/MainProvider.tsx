import React, { useEffect, useState } from "react"
import type { Recipe } from "../interfaces/Recipe"
import { mainContext } from "./MainContext"
import { getRecipes } from "../functions/GetRecipes"

export interface MainContextProps {
  recipes: Recipe[]
}

export default function MainProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRecipes()
      setRecipes(recipes)
    }

    fetchRecipes()
  }, [])

  const value: MainContextProps = {
    recipes,
  }

  return <mainContext.Provider value={value}>{children}</mainContext.Provider>
}
