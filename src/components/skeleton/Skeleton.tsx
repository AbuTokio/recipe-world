interface SkeletonProps {
  width?: number
  height?: number
  className?: string
}

export default function Skeleton({ width, height, className }: SkeletonProps) {
  return <div className={`bg-muted rounded animate-pulse h-full w-full ${className}`} style={{ width, height }} />
}
