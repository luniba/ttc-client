import { cn } from "cn"
import type { ComponentProps } from "react"

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)}
      {...props}
    />
  )
}
