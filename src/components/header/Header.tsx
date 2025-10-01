import { Logo } from "../logo/Logo"
import Navbar from "../navbar/Navbar"

export default function Header() {
  return (
    <header className="flex flex-col justify-between items-center">
      <Logo />
      <Navbar />
    </header>
  )
}
