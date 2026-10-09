import { cn } from "cn"
import { Loader2 } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { Button } from "@/components/ui/button"

type Props = ComponentProps<typeof Button> & {
  loading?: boolean
  loadingText?: ReactNode
  icon?: ReactNode
}

export function LoadingButton({
  loading = false,
  loadingText,
  icon,
  children,
  className,
  ...props
}: Props) {
  return (
    <Button
      {...props}
      disabled={props.disabled || loading}
      focusableWhenDisabled={loading}
      aria-busy={loading || undefined}
      className={cn(loading && "cursor-progress", className)}
    >
      {loading ? <Loader2 className="animate-spin" aria-hidden /> : icon}
      {loading && loadingText ? loadingText : children}
    </Button>
  )
}
