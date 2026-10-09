import { Danger } from "iconsax-reactjs"

import { Button } from "@/components/ui/button"

type Props = { message: string; retryLabel: string; onRetry: () => void }

export function ListError({ message, retryLabel, onRetry }: Props) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      <Danger size={20} color="currentColor" aria-hidden className="shrink-0" />
      <p className="flex-1">{message}</p>
      <Button size="sm" variant="outline" onClick={onRetry}>
        {retryLabel}
      </Button>
    </div>
  )
}
