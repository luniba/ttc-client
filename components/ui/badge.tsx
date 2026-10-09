import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex h-7 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full px-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-4 focus-visible:ring-ring [&>svg]:pointer-events-none [&>svg]:size-3.5!",
  {
    variants: {
      variant: {
        default: "bg-brand-50 text-brand-700",
        gray: "bg-neutral-100 text-label",
        destructive: "bg-destructive-subtle text-destructive",
        success: "bg-success-subtle text-success",
        warning: "bg-warning-subtle text-warning",
        info: "bg-info-subtle text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
