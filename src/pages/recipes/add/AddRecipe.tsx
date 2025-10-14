import { ArrowLeft, Plus, X } from "lucide-react"
import { useEffect, useState } from "react"
import type { Ingredient } from "../../../interfaces/Ingredient"
import { useMain } from "../../../hooks/ContextHooks"
import toast from "react-hot-toast"
import { FormInput } from "../../../components/form/form-input/FormInput"
import { FormTextArea } from "../../../components/form/form-text-area/FormTextArea"
import { FormSelect } from "../../../components/form/form-select/FormSelect"
import type { Category } from "../../../interfaces/Category"
import { Button } from "../../../components/button/Button"

export default function AddRecipe() {
  const [recipeName, setRecipeName] = useState("")
  const [description, setDescription] = useState("")
  const [servings, setServings] = useState("")
  const [category, setCategory] = useState("")
  const [instructions, setInstructions] = useState("")
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  const ctx = useMain()

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: String(ingredients.length),
        name: "",
        quantity: null,
        unit: "",
        additional_info: "",
      },
    ])
  }

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ing) => ing.id !== id))
    }
  }

  const updateIngredient = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(ingredients.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!recipeName.trim()) {
      toast.error("Please enter a recipe name")
      return
    }
    if (!description.trim()) {
      toast.error("Please enter a description")
      return
    }
    if (!servings || parseInt(servings) <= 0) {
      toast.error("Please enter valid servings")
      return
    }
    if (!category) {
      toast.error("Please select a category")
      return
    }
    if (!instructions.trim()) {
      toast.error("Please enter instructions")
      return
    }

    const hasValidIngredient = ingredients.some((ing) => ing.name.trim())
    if (!hasValidIngredient) {
      toast.error("Please add at least one ingredient")
      return
    }

    // TODO: send data to backend
    console.log({
      name: recipeName,
      description,
      servings: parseInt(servings),
      category,
      instructions,
      ingredients: ingredients.filter((ing) => ing.name.trim()),
    })

    toast.success("Recipe created successfully!")

    // TODO: navigate to recipe detail page
  }

  useEffect(() => {
    addIngredient()
  }, [])

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <button
            // TODO: navigate back
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Recipes</span>
          </button>

          <h1 className="mb-2">Add New Recipe</h1>
          <p className="text-muted-foreground">Share your culinary creation with the Recipe World community</p>
        </div>

        {/* Form */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-card rounded-xl border border-border p-6 md:p-8 lg:p-10">
            {/* Basic Information */}
            <div className="space-y-6 mb-8">
              <h2 className="pb-2 border-b border-border">Basic Information</h2>

              <FormInput
                id="recipeName"
                label="Recipe Name *"
                placeholder="e.g., Classic Italian Pasta Carbonara"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                required
              />

              <FormTextArea
                id="description"
                label="Description *"
                placeholder="Describe your recipe, what makes it special, and any important details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  id="servings"
                  label="Servings *"
                  type="number"
                  min="1"
                  placeholder="4"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  required
                />

                <FormSelect
                  id="category"
                  label="Category *"
                  options={ctx.categories.map((category: Category) => ({ value: category.id, label: category.name }))}
                  placeholder="Select a category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <h2>Ingredients</h2>
                <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>

              <div className="space-y-4">
                {ingredients.map((ingredient, index) => (
                  <div
                    key={ingredient.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="md:col-span-4">
                      <FormInput
                        id={`ingredient-name-${ingredient.id}`}
                        label={`Ingredient ${index + 1}`}
                        placeholder="e.g., Spaghetti"
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(ingredient.id, "name", e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <FormInput
                        id={`ingredient-quantity-${ingredient.id}`}
                        label="Quantity"
                        placeholder="400"
                        value={ingredient.quantity || ""}
                        onChange={(e) => updateIngredient(ingredient.id, "quantity", e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <FormInput
                        id={`ingredient-unit-${ingredient.id}`}
                        label="Unit"
                        placeholder="g"
                        value={ingredient.unit || ""}
                        onChange={(e) => updateIngredient(ingredient.id, "unit", e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <FormInput
                        id={`ingredient-info-${ingredient.id}`}
                        label="Additional Info"
                        placeholder="optional"
                        value={ingredient.additional_info || ""}
                        onChange={(e) => updateIngredient(ingredient.id, "additional_info", e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-1 flex items-end">
                      <button
                        type="button"
                        onClick={() => removeIngredient(ingredient.id)}
                        disabled={ingredients.length === 1}
                        className="w-10 h-10 flex items-center justify-center text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Remove ingredient">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-6 mb-8">
              <h2 className="pb-2 border-b border-border">Instructions</h2>

              <FormTextArea
                id="instructions"
                label="Cooking Instructions *"
                placeholder="Write step-by-step instructions. Number each step (1., 2., 3., etc.) for better readability..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={12}
                required
              />
              <p className="text-muted-foreground">
                Tip: Start each step with a number (1., 2., 3., etc.) for automatic formatting
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                className="sm:ml-auto"
                onClick={() => {
                  // recipeName,
                  // description,
                  // servings,
                  // category,
                  // instructions,
                  // ingredients
                  console.log("recipeName:", recipeName)
                  console.log("description:", description)
                  console.log("servings:", servings)
                  console.log("category:", category)
                  console.log("instructions:", instructions)
                  console.log("ingredients:", ingredients)
                }}>
                Create Recipe
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
