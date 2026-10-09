"use client"

import { MailCheck } from "lucide-react"

import { FeaturedIcon } from "@/components/custom/featured-icon"
import { Button } from "@/components/ui/button"

export function ContactSuccess({ onAgain }: { onAgain: () => void }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 py-10 text-center"
    >
      <FeaturedIcon icon={MailCheck} size="2xl" />
      <h2 className="text-display-xs font-semibold">
        Thanks, your message is on its way
      </h2>
      <p className="text-base text-muted-foreground">
        We usually reply within one or two working days.
      </p>
      <Button
        variant="outline"
        size="lg"
        className="rounded-full"
        onClick={onAgain}
      >
        Send another message
      </Button>
    </div>
  )
}
