import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-28 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-base text-foreground shadow-xs transition-[color,box-shadow,border-color] outline-none placeholder:text-placeholder focus-visible:border-brand-300 focus-visible:ring-4 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-muted disabled:text-placeholder aria-invalid:border-red-300 aria-invalid:focus-visible:ring-destructive-ring",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
