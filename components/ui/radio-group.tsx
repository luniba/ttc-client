"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  size = "sm",
  ...props
}: RadioPrimitive.Root.Props & { size?: "sm" | "md" }) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      data-size={size}
      className={cn(
        "group/radio-group-item peer relative flex aspect-square shrink-0 items-center justify-center rounded-full border border-input bg-background outline-none after:absolute after:-inset-x-3 after:-inset-y-2 hover:border-primary hover:bg-brand-50 focus-visible:border-brand-300 focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid aria-invalid:border-red-300 data-[size=md]:size-5 data-[size=sm]:size-4 data-checked:border-primary data-checked:bg-brand-50 data-disabled:cursor-not-allowed data-disabled:border-neutral-200 data-disabled:bg-neutral-100",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="rounded-full bg-primary group-data-[size=md]/radio-group-item:size-2 group-data-[size=sm]/radio-group-item:size-1.5 group-data-disabled/radio-group-item:bg-neutral-200"
      />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
