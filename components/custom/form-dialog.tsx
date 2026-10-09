"use client"

import type { FormEventHandler, ReactNode } from "react"

import { LoadingButton } from "@/components/custom/loading-button"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  submitLabel: string
  cancelLabel: string
  pending: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
  children: ReactNode
}

// A dialog holding one form: fields scroll, the title and buttons stay put. Forms inside validate
// on submit, then live (react-hook-form's default): the first field has focus when it opens, so
// validating on blur would flag it as soon as someone clicks elsewhere.
export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  submitLabel,
  cancelLabel,
  pending,
  onSubmit,
  children,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => !pending && onOpenChange(o)}>
      <DialogContent>
        <form
          onSubmit={onSubmit}
          noValidate
          className="flex min-h-0 flex-1 flex-col"
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <DialogBody className="flex flex-col gap-5 pb-2">
            {children}
          </DialogBody>
          <DialogFooter>
            <DialogClose
              disabled={pending}
              render={<Button type="button" variant="outline" />}
            >
              {cancelLabel}
            </DialogClose>
            <LoadingButton type="submit" loading={pending}>
              {submitLabel}
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
