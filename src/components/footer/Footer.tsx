import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { useResponsive } from "../../hooks/ResponsiveHooks"
import { Logo } from "../logo/Logo"
import Navbar from "../navbar/Navbar"
import SocialLink from "../social-link/SocialLink"
import { Link } from "react-router"
import ThemeToggle from "../theme-toggle/ThemeToggle"

export function Footer() {
  const bp = useResponsive()

  return (
    <footer className="w-full border-t border-border bg-card mb-18 lg:mb-0">
      {!bp.isLg && (
        <Navbar
          className={
            "fixed bottom-0 z-50 w-full border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
          }
        />
      )}

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <Logo size="small" />
            <p className="mt-4 text-muted-foreground max-w-md">
              Discover delicious recipes from around the world. Cook with confidence, share your creations, and join our
              community of food lovers.
            </p>
          </div>

          <div className="flex justify-between">
            <div>
              <h4 className="mb-4">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                <SocialLink to="https://www.youtube.com/" icon={Youtube} />
                <SocialLink to="https://www.instagram.com/" icon={Instagram} />
                <SocialLink to="https://www.facebook.com/" icon={Facebook} />
                <SocialLink to="https://www.x.com/" icon={Twitter} />
                {/* TODO: find alternative for social icons, brand icons are depraced in lucide and will be removed */}
              </div>
            </div>
            {!bp.isMd && (
              <div className="place-self-end">
                <ThemeToggle />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Recipe World. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
