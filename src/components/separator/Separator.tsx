interface SeparatorProps {
  className?: string
}

export default function Separator({ className }: SeparatorProps) {
  return <div className={`${className} w-full h-[1px] bg-muted`}></div>
}
