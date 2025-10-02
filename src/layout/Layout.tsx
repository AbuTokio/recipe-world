import { Outlet, useLocation } from "react-router"
import Header from "../components/header/Header"
import { Toaster } from "react-hot-toast"
import InitialScroll from "../utils/Scroll"
import Footer from "../components/footer/Footer"

export default function Layout() {
  InitialScroll()
  const route = useLocation().pathname
  const hide = {
    header: ["/"],
    footer: ["/"],
  }

  return (
    <>
      <div className="absolute -top-10 bg-white w-10 h-10 z-999">
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      {!hide.header.includes(route) && <Header />}
      <main className="px-4 py-4">
        <Outlet />
      </main>
      {!hide.footer.includes(route) && <Footer />}
    </>
  )
}
