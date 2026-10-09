import type { UseQueryResult } from "@tanstack/react-query"
import type { Icon } from "iconsax-reactjs"
import type { ReactNode } from "react"

import { EmptyState } from "@/components/custom/empty-state"
import { ListError } from "@/components/custom/list-error"
import { ListSkeleton } from "@/components/custom/list-skeleton"

type Props<T> = {
  query: UseQueryResult<T[]>
  label: string
  loadError: string
  retryLabel: string
  empty: { icon: Icon; title: string; description: string; action?: ReactNode }
  children: (item: T) => ReactNode
}

// A school list in its four states: loading, failed, empty, and the rows themselves.
export function ResourceList<T>({
  query,
  label,
  loadError,
  retryLabel,
  empty,
  children,
}: Props<T>) {
  if (query.isPending) return <ListSkeleton />
  if (query.isError)
    return (
      <ListError
        message={loadError}
        retryLabel={retryLabel}
        onRetry={() => query.refetch()}
      />
    )
  if (query.data.length === 0) return <EmptyState {...empty} />
  return (
    <ul
      aria-label={label}
      className="divide-y divide-neutral-200 rounded-xl bg-neutral-100"
    >
      {query.data.map(children)}
    </ul>
  )
}
