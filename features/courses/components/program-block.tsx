import { cn } from "cn"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"

type Props = {
  title: string
  text: string
  start: string
  price: number
  image: StaticImageData
  reverse?: boolean
  enroll: { href: string; label: string }
  details: { href: string; label: string }
}

export function ProgramBlock(p: Props) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
      <div
        className={cn(
          "relative aspect-4/3 overflow-hidden rounded-3xl bg-muted",
          p.reverse && "md:order-last"
        )}
      >
        <Image
          src={p.image}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-5">
        <h2 className="text-display-xs font-semibold md:text-display-sm">
          {p.title}
        </h2>
        <p className="text-lg text-muted-foreground">{p.text}</p>
        <p className="text-base font-medium text-label">{p.start}</p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={p.enroll.href}
            className={cn(buttonVariants({ size: "xl" }), "rounded-full")}
          >
            {p.enroll.label} · {formatPrice(p.price)}
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
      </div>
    </div>
  )
}
