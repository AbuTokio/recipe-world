import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import Layout from "./layout/Layout"
import Home from "./pages/home/Home"
import Splash from "./pages/splash/Splash"
import Recipes from "./pages/recipes/Recipes"
import Category from "./pages/recipes/category/Category"
import Detail from "./pages/recipes/detail/Detail"
import About from "./pages/about/About"
import AddRecipe from "./pages/recipes/add/AddRecipe"
import EditRecipe from "./pages/recipes/edit/EditRecipe"
import Login from "./pages/login/Login"
import Profile from "./pages/profile/Profile"
import Favorites from "./pages/recipes/favorites/Favorites"

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Splash />} />
        <Route path="home" element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/:categoryId" element={<Category />} />
        <Route path="recipes/detail/:recipeId" element={<Detail />} />
        <Route path="recipes/add" element={<AddRecipe />} />
        <Route path="recipes/edit/:recipeId" element={<EditRecipe />} />
        <Route path="recipes/favorites" element={<Favorites />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
