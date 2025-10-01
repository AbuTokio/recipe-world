import { Outlet } from "react-router"
import Header from "../components/header/Header"
import { Toaster } from "react-hot-toast"
import InitialScroll from "../utils/Scroll"

export default function Layout() {
  InitialScroll()

  return (
    <>
      <div className="absolute -top-10 bg-white w-10 h-10 z-999">
        <Toaster position="top-center" reverseOrder={true} />
      </div>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}
