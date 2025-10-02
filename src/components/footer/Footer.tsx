import { useResponsive } from "../../hooks/ResponsiveHooks"
import Navbar from "../navbar/Navbar"

export default function Footer() {
  const bp = useResponsive()

  return <footer>{!bp.isMd && <Navbar />}</footer>
}
