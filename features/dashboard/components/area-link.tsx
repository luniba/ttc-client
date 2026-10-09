"use client"

import { cn } from "cn"
import { ArrowRight2, type Icon } from "iconsax-reactjs"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

type Props = {
  title: string
  description: string
  href: string
  icon: Icon
  actionLabel: string
}

// One row of a link list (the setup-step look from web); the whole row links to the area.
export function AreaLink(p: Props) {
  const Icon = p.icon
  return (
    <li className="relative flex items-center gap-4 p-4 transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-neutral-50">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-neutral-200 text-neutral-600 shadow-xs">
        <Icon size={20} color="currentColor" aria-hidden />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Link
          href={p.href}
          className="text-[15px] font-medium outline-none after:absolute after:inset-0 after:rounded-[inherit] focus-visible:after:ring-4 focus-visible:after:ring-ring"
        >
          {p.title}
        </Link>
        <p className="text-sm text-muted-foreground">{p.description}</p>
      </div>
      <span
        aria-hidden
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "max-sm:size-8 max-sm:border-0 max-sm:px-0 max-sm:shadow-none"
        )}
      >
        <span className="max-sm:hidden">{p.actionLabel}</span>
        <ArrowRight2
          size={16}
          color="currentColor"
          aria-hidden
          className="rtl:rotate-180"
        />
      </span>
    </li>
  )
}
