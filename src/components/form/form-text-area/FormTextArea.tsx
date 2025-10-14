import type { TextareaHTMLAttributes } from "react"

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function FormTextArea({ label, error, className = "", ...props }: FormTextareaProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={props.id} className="block text-foreground">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-vertical ${className}`}
        {...props}
      />
      {error && <p className="text-destructive">{error}</p>}
    </div>
  )
}
