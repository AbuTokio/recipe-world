import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { useEffect, useState } from "react"
import { Navigate } from "react-router"

interface SplashProps {
  duration?: number
}

export default function Splash({ duration = 3000 }: SplashProps) {
  const [navigate, setNavigate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setNavigate(true)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration])

  return (
    <>
      <div className="h-screen w-screen content-center">
        <DotLottieReact className="mx-auto w-98 bg-background" src="/foodprep.lottie" loop autoplay />
      </div>
      {navigate && <Navigate to="/home" />}
    </>
  )
}
