"use client"

import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import success from "@/components/ui/success.json"
import type { VerifiedCertificate } from "@/features/certificate/services/verify"
import { formatDay } from "@/lib/format"

// The SVG-only build is all this animation needs; loaded in the browser only, since the engine
// touches `document` when imported.
const Lottie = dynamic(() => import("lottie-react").then((m) => m.LottieSvg), {
  ssr: false,
})

// The file paints a white square behind the tick; dropped so it sits on the dark dialog.
const animation = {
  ...success,
  layers: success.layers.filter((l) => l.nm !== "BG"),
}

type Props = { certificate: VerifiedCertificate; onClose: () => void }

export function VerifiedDialog({ certificate: c, onClose }: Props) {
  const rows: [string, string][] = [
    ["Holder", c.holderName],
    ["Course", c.courseTitle],
    ["Issued", formatDay(c.issuedAt)],
    ["Certificate number", c.certificateNo],
  ]

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-card">
        <DialogHeader className="items-center text-center">
          <Lottie
            src={animation}
            autoplay
            loop={false}
            aria-hidden
            className="size-36"
          />
          <DialogTitle className="text-xl">Certificate verified</DialogTitle>
          <DialogDescription>
            This is a genuine certificate issued by TESOL TEFL Council.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <dl className="divide-y divide-neutral-200 rounded-xl bg-neutral-50 text-sm">
            {rows.map(([term, value]) => (
              <div key={term} className="flex justify-between gap-4 px-4 py-3">
                <dt className="text-muted-foreground">{term}</dt>
                <dd className="text-end font-medium break-all">{value}</dd>
              </div>
            ))}
          </dl>
        </DialogBody>
        <DialogFooter className="sm:justify-center">
          <Button size="lg" className="w-full rounded-full" onClick={onClose}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
