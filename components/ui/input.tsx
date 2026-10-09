import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3.5 py-2.5 text-base text-foreground shadow-xs transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-placeholder focus-visible:border-brand-300 focus-visible:ring-4 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-muted disabled:text-placeholder aria-invalid:border-red-300 aria-invalid:focus-visible:ring-destructive-ring",
        className
      )}
      {...props}
    />
  )
}

export { Input }
