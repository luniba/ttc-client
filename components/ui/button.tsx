import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent font-semibold whitespace-nowrap shadow-xs transition-colors outline-none select-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid active:shadow-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        primary:
          "border-primary bg-primary text-primary-foreground hover:border-primary/90 hover:bg-primary/90 active:border-primary/80 active:bg-primary/80 disabled:border-primary/30 disabled:bg-primary/30",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:border-brand-100 hover:bg-brand-100 active:border-brand-200 active:bg-brand-200 disabled:border-brand-25 disabled:bg-brand-25 disabled:text-brand-300",
        outline:
          "border-input bg-background text-label hover:bg-neutral-50 hover:text-neutral-800 focus-visible:ring-neutral-100 active:bg-neutral-100 disabled:border-neutral-200 disabled:text-disabled",
        "ghost-brand":
          "text-brand-700 shadow-none hover:bg-brand-50 active:bg-brand-100 disabled:text-disabled",
        ghost:
          "text-muted-foreground shadow-none hover:bg-neutral-50 hover:text-label focus-visible:ring-neutral-100 active:bg-neutral-100 disabled:text-disabled",
        link: "text-brand-700 shadow-none hover:text-brand-800 active:text-brand-900 disabled:text-disabled",
        "link-gray":
          "text-muted-foreground shadow-none hover:text-label active:text-neutral-800 disabled:text-disabled",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground outline-destructive hover:border-red-700 hover:bg-red-700 focus-visible:ring-destructive-ring active:border-red-800 active:bg-red-800 disabled:border-red-200 disabled:bg-red-200",
        "destructive-secondary":
          "border-destructive-subtle bg-destructive-subtle text-red-700 outline-destructive hover:border-red-100 hover:bg-red-100 focus-visible:ring-destructive-ring active:border-red-200 active:bg-red-200 disabled:border-red-25 disabled:bg-red-25 disabled:text-red-300",
        "destructive-outline":
          "border-red-300 bg-background text-red-700 outline-destructive hover:bg-red-50 hover:text-red-800 focus-visible:ring-destructive-ring active:bg-red-100 disabled:border-red-200 disabled:text-red-300",
        "destructive-link":
          "text-red-700 shadow-none outline-destructive hover:text-red-800 active:text-red-900 disabled:text-red-300",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-4.5 text-base",
        xl: "h-12 px-5 text-base",
        "icon-sm": "size-9",
        "icon-md": "size-10",
        "icon-lg": "size-11",
        "icon-xl": "size-12",
      },
    },
    compoundVariants: [
      {
        variant: ["link", "link-gray", "destructive-link"],
        className: "h-auto px-0",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
