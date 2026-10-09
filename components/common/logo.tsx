import { cn } from "cn"
import Image from "next/image"

import logo from "@/public/images/logo.png"

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt=""
      aria-hidden
      sizes="40px"
      className={cn("size-10", className)}
    />
  )
}

// The laurel already spells out the council's name, so no text beside it.
export function Logo({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  return (
    <Image
      src={logo}
      alt={name}
      sizes="64px"
      priority
      className={cn("size-14", className)}
    />
  )
}
