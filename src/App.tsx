import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import Layout from "./layout/Layout"
import Home from "./pages/home/Home"
import Splash from "./pages/splash/Splash"
import Recipes from "./pages/recipes/Recipes"
import Category from "./pages/recipes/category/Category"
import Detail from "./pages/recipes/detail/Detail"
import About from "./pages/about/About"

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Splash />} />
        <Route path="home" element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/:categoryId" element={<Category />} />
        <Route path="recipes/detail/:recipeId" element={<Detail />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<div>Login</div>} />
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
