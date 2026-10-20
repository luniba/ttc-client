"use client"

import { AlertDialog } from "@base-ui/react/alert-dialog"
import { OctagonAlert, ShieldCheck } from "lucide-react"

import { LoadingButton } from "@/components/custom/loading-button"
import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel: string
  cancelLabel: string
  pending: boolean
  onConfirm: () => void
  // destructive (default) for deletes; primary for positive actions.
  tone?: "destructive" | "primary"
}

// Asks before something that is hard to undo.
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  pending,
  onConfirm,
  tone = "destructive",
}: Props) {
  const destructive = tone === "destructive"
  return (
    <AlertDialog.Root
      open={open}
      onOpenChange={(o) => !pending && onOpenChange(o)}
    >
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-neutral-950/40 duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-2xl border border-border bg-popover p-6 text-popover-foreground shadow-xl duration-150 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
          <div className="flex flex-col items-center gap-2 text-center">
            <span
              className={
                destructive
                  ? "mb-2 grid size-14 place-items-center rounded-full bg-destructive/10"
                  : "mb-2 grid size-14 place-items-center rounded-full bg-brand-50"
              }
            >
              {destructive ? (
                <OctagonAlert className="size-7 text-destructive" aria-hidden />
              ) : (
                <ShieldCheck className="size-7 text-brand-700" aria-hidden />
              )}
            </span>
            <AlertDialog.Title className="text-lg font-semibold">
              {title}
            </AlertDialog.Title>
            <AlertDialog.Description className="text-[15px] text-muted-foreground">
              {description}
            </AlertDialog.Description>
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <AlertDialog.Close
              disabled={pending}
              render={<Button type="button" variant="ghost" />}
            >
              {cancelLabel}
            </AlertDialog.Close>
            <LoadingButton
              type="button"
              variant={destructive ? "destructive" : "primary"}
              loading={pending}
              onClick={onConfirm}
            >
              {confirmLabel}
            </LoadingButton>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
