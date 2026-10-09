"use client"

import { cn } from "cn"

import { Container } from "@/components/common/container"
import { buttonVariants } from "@/components/ui/button"

// A public page whose data couldn't load (usually the API being unreachable).
export default function Error({ retry }: { retry: () => void }) {
  return (
    <section className="py-24 md:py-32">
      <Container className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-display-xs font-semibold md:text-display-sm">
          {"We couldn't load this page"}
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Please try again in a moment.
        </p>
        <button
          type="button"
          onClick={retry}
          className={cn(buttonVariants({ size: "xl" }), "mt-2 rounded-full")}
        >
          Try again
        </button>
      </Container>
    </section>
  )
}
