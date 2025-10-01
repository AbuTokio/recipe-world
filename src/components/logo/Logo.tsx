import Icon from "./icon/Icon"

interface LogoProps {
  size?: "small" | "default" | "large"
}

export function Logo({ size = "default" }: LogoProps) {
  const sizeClasses = {
    small: {
      container: "gap-2",
      icon: "w-6 h-6",
      text: "text-xl",
      subtext: "text-xs",
    },
    default: {
      container: "gap-3",
      icon: "w-10 h-10",
      text: "text-4xl",
      subtext: "text-sm",
    },
    large: {
      container: "gap-4",
      icon: "w-16 h-16",
      text: "text-6xl",
      subtext: "text-base",
    },
  }

  const classes = sizeClasses[size]

  return (
    <div className={`flex items-center select-none ${classes.container}`}>
      <Icon className={classes.icon} />

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span
            className={`${classes.text} font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent`}>
            Recipe
          </span>
          <span className={`${classes.text} font-bold text-gray-800 dark:text-gray-100`}>World</span>
        </div>
        <span className={`${classes.subtext} text-gray-500 dark:text-gray-400 tracking-wide uppercase -mt-1`}>
          Discover. Cook. Share.
        </span>
      </div>
    </div>
  )
}
