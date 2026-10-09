import type { LucideIcon } from "lucide-react"

import { FeaturedIcon } from "@/components/custom/featured-icon"

export type Feature = { icon: LucideIcon; title: string; text: string }

export function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <li
          key={f.title}
          className="flex flex-col gap-5 rounded-2xl bg-muted p-6"
        >
          <FeaturedIcon icon={f.icon} />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="text-base text-muted-foreground">{f.text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
