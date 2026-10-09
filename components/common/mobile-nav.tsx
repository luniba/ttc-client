"use client"

import { cn } from "cn"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button, buttonVariants } from "@/components/ui/button"

type NavLink = { href: string; label: string }

type Props = {
  links: NavLink[]
  menuLabel: string
  login: NavLink
  cta: NavLink
}

export function MobileNav({ links, menuLabel, login, cta }: Props) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon-lg"
        className="group-data-[tone=dark]/header:text-white group-data-[tone=dark]/header:hover:bg-white/10"
        aria-label={menuLabel}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      {open && (
        <div className="absolute inset-x-0 top-20 animate-in border-b border-border bg-background shadow-lg fade-in slide-in-from-top-2 motion-reduce:animate-none">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                className="rounded-lg px-3 py-3 text-base font-semibold text-foreground hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 border-t border-border px-4 py-4">
            <Link
              href={login.href}
              onClick={close}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full rounded-full"
              )}
            >
              {login.label}
            </Link>
            <Link
              href={cta.href}
              onClick={close}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full rounded-full"
              )}
            >
              {cta.label}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
