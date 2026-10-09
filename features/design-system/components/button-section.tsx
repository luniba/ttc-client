import { ArrowRight, Plus, Trash2 } from "lucide-react"

import { LoadingButton } from "@/components/custom/loading-button"
import { Button } from "@/components/ui/button"

const variants = [
  "primary",
  "secondary",
  "outline",
  "ghost-brand",
  "ghost",
  "link",
  "link-gray",
  "destructive",
  "destructive-secondary",
  "destructive-outline",
  "destructive-link",
] as const

const sizes = ["sm", "md", "lg", "xl"] as const

export function ButtonSection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-display-xs font-semibold">Buttons</h2>
      <div className="grid grid-cols-[12rem_repeat(4,auto)] items-center justify-start gap-x-6 gap-y-4">
        <span />
        {["Default", "With icon", "Disabled", "Loading"].map((h) => (
          <span key={h} className="text-sm font-medium text-muted-foreground">
            {h}
          </span>
        ))}
        {variants.map((variant) => (
          <div key={variant} className="contents">
            <span className="text-sm text-label">{variant}</span>
            <Button variant={variant}>Button CTA</Button>
            <Button variant={variant}>
              <Plus />
              Button CTA
            </Button>
            <Button variant={variant} disabled>
              Button CTA
            </Button>
            <LoadingButton variant={variant} loading loadingText="Saving…">
              Button CTA
            </LoadingButton>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {sizes.map((size) => (
          <Button key={size} size={size}>
            Size {size}
            <ArrowRight />
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {sizes.map((size) => (
          <Button
            key={size}
            size={`icon-${size}`}
            variant="outline"
            aria-label="Add"
          >
            <Plus />
          </Button>
        ))}
        <Button size="icon-md" variant="destructive" aria-label="Delete">
          <Trash2 />
        </Button>
        <LoadingButton size="icon-md" loading aria-label="Saving" />
      </div>
    </section>
  )
}
