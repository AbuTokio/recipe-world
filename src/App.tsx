import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import Layout from "./layout/Layout"
import Home from "./pages/home/Home"
import Splash from "./pages/splash/Splash"

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Splash />} />
        <Route path="home" element={<Home />} />
        <Route path="recipes" element={<div>Recipes</div>} />
        <Route path="about" element={<div>About</div>} />
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
