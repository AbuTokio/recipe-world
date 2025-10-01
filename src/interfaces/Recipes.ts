export interface Recipe {
  id: number
  title: string
  description: string
  ingredients: Ingredient[]
  instructions: Instruction[]
  created_at: string
}

export interface Ingredient {
  id: number
  name: string
  quantity: string
}

export interface Instruction {
  step: number
  description: string
}
