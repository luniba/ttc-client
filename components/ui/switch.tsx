"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"

function Switch({
  className,
  size = "sm",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "md"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full p-0.5 transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid data-[size=md]:h-6 data-[size=md]:w-11 data-[size=sm]:h-5 data-[size=sm]:w-9 data-checked:bg-primary data-checked:hover:bg-primary/90 data-unchecked:bg-neutral-100 data-unchecked:hover:bg-neutral-200 data-disabled:cursor-not-allowed data-disabled:bg-neutral-100 data-disabled:hover:bg-neutral-100",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-white shadow-sm transition-transform group-data-[size=md]/switch:size-5 group-data-[size=sm]/switch:size-4 group-data-disabled/switch:bg-neutral-50 group-data-[size=md]/switch:data-checked:translate-x-5 group-data-[size=sm]/switch:data-checked:translate-x-4 data-unchecked:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
