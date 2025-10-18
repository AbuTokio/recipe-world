import { Outlet, useLocation } from "react-router"
import Header from "../components/header/Header"
import { Toaster } from "react-hot-toast"
import InitialScroll from "../utils/Scroll"
import { Footer } from "../components/footer/Footer"
import Hero from "../components/hero/Hero"

export default function Layout() {
  InitialScroll()
  const route = useLocation().pathname
  const hide = {
    header: ["/"],
    hero: ["/recipes/detail/", "/404", "/"],
    footer: ["/"],
  }

  return (
    <>
      <div className="absolute -top-10 bg-transparent w-10 h-10 z-999">
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      {!hide.header.includes(route) && <Header />}
      <main className="px-4 py-4">
        {!route.startsWith(hide.hero[0]) && !hide.hero.includes(route) && <Hero />}
        <Outlet />
      </main>
      {!hide.footer.includes(route) && <Footer />}
    </>
  )
}
