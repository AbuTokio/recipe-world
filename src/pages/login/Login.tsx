import React, { useRef, useState } from "react"
import toast from "react-hot-toast"
import { Button } from "../../components/button/Button"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import supabase from "../../utils/supabase"
import { useNavigate } from "react-router"

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)

  const handleLogin = async (loginData: { email: string; password: string }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      })
      if (error) console.error("Fehler beim Login:", error)
      console.log("Login war erfolgreich:", data)
      navigate("/profile")
    } catch (error) {
      console.error("Fehler beim Login:", error)
    }
  }

  const handleSignUp = async (signUpData: {
    email: string
    password: string
    username: string
    firstname: string
    lastname: string
  }) => {
    try {
      console.log(
        "Signup data:",
        signUpData.email,
        signUpData.password,
        signUpData.username,
        signUpData.firstname,
        signUpData.lastname
      )
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            username: signUpData.username,
            firstname: signUpData.firstname,
            lastname: signUpData.lastname,
          },
        },
      })
      if (error) console.error("Fehler beim SignUp:", error)
      console.log("SignUp war erfolgreich:", data)
      navigate("/profile")
    } catch (error) {
      console.error("Fehler beim SignUp:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const formValues = Object.fromEntries(formData.entries()) as {
      firstname: string
      lastname: string
      username: string
      email: string
      password: string
      confirmPassword: string
    }

    if (isLogin) {
      // Login validation
      if (!formValues.email.trim()) {
        toast.error("Please enter your email")
        return
      }
      if (!formValues.password) {
        toast.error("Please enter your password")
        return
      }

      await handleLogin(formValues)
      toast.success("Welcome back!")
    } else {
      // Signup validation
      if (!formValues.firstname.trim() || !formValues.lastname.trim()) {
        toast.error("Please enter your name")
        return
      }
      if (!formValues.email.trim()) {
        toast.error("Please enter your email")
        return
      }
      if (!formValues.password) {
        toast.error("Please enter your password")
        return
      }
      if (formValues.password.length < 8) {
        toast.error("Password must be at least 8 characters")
        return
      }
      if (formValues.password !== formValues.confirmPassword) {
        toast.error("Passwords do not match")
        return
      }

      await handleSignUp(formValues)
      toast.success("Account created successfully!")

      setTimeout(() => {
        // After signup, switch to login mode or redirect as needed
      }, 1000)
    }
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    // Clear form fields when switching
    formRef.current?.reset()
    setShowPassword(false)
  }

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="min-h-screen bg-background flex justify-center p-4">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-card rounded-2xl border border-border shadow-xl p-6 md:p-8">
            {/* Tab Toggle */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg mb-8">
              <button
                type="button"
                onClick={() => {
                  if (!isLogin) switchMode()
                }}
                className={`flex-1 py-2.5 rounded-md transition-all ${
                  isLogin
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground cursor-pointer"
                }`}>
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isLogin) switchMode()
                }}
                className={`flex-1 py-2.5 rounded-md transition-all ${
                  !isLogin
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground cursor-pointer"
                }`}>
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" ref={formRef}>
              {/* Name field - only for signup */}
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="firstname" className="block text-foreground">
                      First Name *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        placeholder="Enter your first name"
                        className="w-full pl-12 pr-4 py-3 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastname" className="block text-foreground">
                      Last Name *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full pl-12 pr-4 py-3 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="username" className="block text-foreground">
                      Username *
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter a username"
                        className="w-full pl-12 pr-4 py-3 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-foreground">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-foreground">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    className="w-full pl-12 pr-12 py-3 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {!isLogin && <p className="text-muted-foreground">Must be at least 8 characters</p>}
              </div>

              {/* Confirm Password field - only for signup */}
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-foreground">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className="w-full pl-12 pr-12 py-3 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password - only for login */}
              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => toast.error("Password reset feature coming soon!")}>
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => toast.error("Google sign-in coming soon!")}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-input rounded-lg hover:bg-accent transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => toast.error("Apple sign-in coming soon!")}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-input rounded-lg hover:bg-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"></path>
                </svg>
                Continue with Apple
              </button>
            </div>

            {/* Terms and Privacy - only for signup */}
            {!isLogin && (
              <p className="text-center text-muted-foreground mt-6">
                By signing up, you agree to our{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => toast.error("Terms of Service page coming soon!")}>
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => toast.error("Privacy Policy page coming soon!")}>
                  Privacy Policy
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
