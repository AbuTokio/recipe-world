import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { useEffect } from "react"
import { useNavigate } from "react-router"

interface SplashProps {
  duration?: number
}

export default function Splash({ duration = 3000 }: SplashProps) {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home")
    }, duration)
    return () => clearTimeout(timer)
  }, [duration])

  return (
    <>
      <div className="h-screen w-screen content-center">
        <DotLottieReact className="mx-auto w-98 bg-background" src="/foodprep.lottie" autoplay />
      </div>
    </>
  )
}
