import { cn } from "cn"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { CheckItem } from "@/features/marketing/components/check-item"
import { formatPrice } from "@/lib/format"

type Props = {
  title: string
  price: number
  priceNote: string
  badges: string[]
  features: string[]
  enroll: { href: string; label: string }
  details: { href: string; label: string }
}

export function PriceCard(p: Props) {
  return (
    <article className="flex flex-col gap-8 rounded-2xl border border-neutral-200 bg-card p-6 shadow-xs md:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {p.badges.map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
        <h3 className="text-xl font-semibold">{p.title}</h3>
        <p className="flex items-baseline gap-2">
          <span className="text-display-lg font-semibold">
            {formatPrice(p.price)}
          </span>
          <span className="text-sm text-muted-foreground">{p.priceNote}</span>
        </p>
      </div>
      <ul className="flex flex-1 flex-col gap-3 text-base text-label">
        {p.features.map((f) => (
          <CheckItem key={f}>{f}</CheckItem>
        ))}
      </ul>
      {/* Side by side; stacked only on phones, where both won't fit on one line. */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={p.enroll.href}
          className={cn(buttonVariants({ size: "xl" }), "rounded-full")}
        >
          {p.enroll.label}
        </Link>
        <Link
          href={p.details.href}
          className={cn(
            buttonVariants({ variant: "outline", size: "xl" }),
            "rounded-full"
          )}
        >
          {p.details.label}
        </Link>
      </div>
    </article>
  )
}
