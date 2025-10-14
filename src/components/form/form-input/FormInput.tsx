import type { InputHTMLAttributes } from "react"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function FormInput({ label, error, className = "", ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={props.id} className="block text-foreground">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${className}`}
        {...props}
      />
      {error && <p className="text-destructive">{error}</p>}
    </div>
  )
}
