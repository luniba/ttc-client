"use client"

import type { UseMutationResult } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"

import { ConfirmDialog } from "@/components/custom/confirm-dialog"
import { getErrorKey } from "@/lib/axios"

type Options<T> = {
  remove: UseMutationResult<unknown, Error, string>
  title: string
  describe: (item: T) => string
  done: string
  // After a successful delete, e.g. step back a page that is now empty.
  onDone?: () => void
}

// "Delete this?" for a table row: ask(item) opens the confirmation; render dialog once. ask is
// stable, so table columns that use it do not rebuild every render.
export function useDeleteConfirm<T extends { id: string }>(o: Options<T>) {
  // Kept after closing so the text does not vanish while the dialog animates out.
  const [state, setState] = useState<{ item: T; open: boolean }>()
  const ask = useCallback((item: T) => setState({ item, open: true }), [])

  const confirm = () =>
    state &&
    o.remove.mutate(state.item.id, {
      onSuccess: () => {
        toast.success(o.done)
        setState({ ...state, open: false })
        o.onDone?.()
      },
      onError: (e) => toast.error(getErrorKey(e)),
    })

  const dialog = (
    <ConfirmDialog
      open={!!state?.open}
      onOpenChange={(open) => state && setState({ ...state, open })}
      title={o.title}
      description={state ? o.describe(state.item) : ""}
      confirmLabel={"Delete"}
      cancelLabel={"Cancel"}
      pending={o.remove.isPending}
      onConfirm={confirm}
    />
  )
  return { ask, dialog }
}
