"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { CheckIcon, MinusIcon } from "lucide-react"

const checkboxVariants = cva(
  "peer relative flex shrink-0 items-center justify-center border border-input bg-background text-primary transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 hover:border-primary hover:bg-brand-50 focus-visible:border-brand-300 focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid aria-invalid:border-red-300 data-indeterminate:border-primary data-indeterminate:bg-brand-50 data-checked:border-primary data-checked:bg-brand-50 data-disabled:cursor-not-allowed data-disabled:border-neutral-200 data-disabled:bg-neutral-100 data-disabled:text-neutral-200",
  {
    variants: {
      size: {
        sm: "size-4 [&_svg]:size-3",
        md: "size-5 [&_svg]:size-3.5",
      },
      shape: {
        square: "data-[size=md]:rounded-md data-[size=sm]:rounded-sm",
        circle:
          "rounded-full data-checked:bg-primary data-checked:text-primary-foreground data-disabled:data-checked:bg-neutral-100",
      },
    },
    defaultVariants: { size: "sm", shape: "square" },
  }
)

function Checkbox({
  className,
  size = "sm",
  shape = "square",
  ...props
}: CheckboxPrimitive.Root.Props & VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-size={size}
      className={cn(checkboxVariants({ size, shape }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&_svg]:stroke-3"
      >
        {props.indeterminate ? <MinusIcon /> : <CheckIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
