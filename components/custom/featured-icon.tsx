import { cn } from "cn"
import type { ComponentType, SVGProps } from "react"

type Props = {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  size?: "md" | "lg" | "2xl"
  tone?: "brand" | "error"
}

export function FeaturedIcon({
  icon: Icon,
  size = "lg",
  tone = "brand",
}: Props) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full",
        size === "2xl" && "size-20 border-12 [&_svg]:size-10",
        size === "lg" && "size-12 border-8 [&_svg]:size-6",
        size === "md" && "size-10 border-6 [&_svg]:size-5",
        tone === "brand"
          ? "border-brand-50 bg-brand-100 text-brand-600"
          : "border-red-50 bg-red-100 text-red-600"
      )}
    >
      <Icon />
    </span>
  )
}
