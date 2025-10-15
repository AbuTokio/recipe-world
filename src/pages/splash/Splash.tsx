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
      <div className="absolute top-0 left-0 right-0 bottom-0 content-center">
        <DotLottieReact className="mx-auto w-98 bg-background" src="/foodprep.lottie" autoplay />
      </div>
    </>
  )
}
