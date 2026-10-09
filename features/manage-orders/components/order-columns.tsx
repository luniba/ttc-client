"use client"

import { useMemo } from "react"

import { actionsColumn, RowActions } from "@/components/custom/row-actions"
import { StatusBadge } from "@/features/manage-orders/components/status-badge"
import type { Order } from "@/features/manage-orders/services/orders"
import { formatDateTime, formatPrice } from "@/lib/format"
import { listColumns } from "@/lib/table"

type Actions = {
  onEdit: (o: Order) => void
  onDelete: (o: Order) => void
}

export function useOrderColumns({ onEdit, onDelete }: Actions) {
  return useMemo(() => {
    const col = listColumns<Order>()
    return [
      col.display({
        id: "orderNo",
        header: "Order No",
        meta: {
          className: "whitespace-nowrap font-mono text-[13px] text-foreground",
        },
        cell: ({ row }) => row.original.orderNo,
      }),
      col.display({
        id: "orderedAt",
        header: "Date",
        meta: { className: "whitespace-nowrap tabular-nums" },
        cell: ({ row }) => formatDateTime(row.original.orderedAt),
      }),
      col.display({
        id: "candidate",
        header: "Candidate",
        meta: { className: "min-w-48" },
        cell: ({ row: { original: o } }) => (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-foreground">
              {o.candidate.passportName}
            </span>
            <span className="text-muted-foreground">{o.candidate.email}</span>
          </div>
        ),
      }),
      col.display({
        id: "courses",
        header: "Courses",
        meta: { className: "min-w-56" },
        cell: ({ row }) => row.original.items.map((i) => i.title).join(", "),
      }),
      col.display({
        id: "total",
        header: "Total",
        meta: {
          className:
            "text-end whitespace-nowrap tabular-nums font-medium text-foreground",
        },
        cell: ({ row }) => formatPrice(row.original.total),
      }),
      col.display({
        id: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      }),
      actionsColumn<Order>({
        header: "Actions",
        editLabel: (o) => `Edit order ${o.orderNo}`,
        deleteLabel: (o) => `Delete order ${o.orderNo}`,
        onEdit,
        onDelete,
      }),
    ]
  }, [onEdit, onDelete])
}

// The same order as a card, for phones.
export function OrderCard({
  order: o,
  onEdit,
  onDelete,
}: { order: Order } & Actions) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="flex flex-wrap items-center gap-2 font-medium">
          <span className="font-mono text-[13px]">{o.orderNo}</span>
          <StatusBadge status={o.status} />
        </p>
        <p className="text-sm">{o.candidate.passportName}</p>
        <p className="text-sm text-muted-foreground">
          {o.items.map((i) => i.title).join(", ")}
        </p>
        <p className="text-sm text-muted-foreground tabular-nums">
          {formatDateTime(o.orderedAt)} ·{" "}
          <span className="font-semibold text-foreground">
            {formatPrice(o.total)}
          </span>
        </p>
      </div>
      <RowActions
        editLabel={`Edit order ${o.orderNo}`}
        deleteLabel={`Delete order ${o.orderNo}`}
        onEdit={() => onEdit(o)}
        onDelete={() => onDelete(o)}
      />
    </div>
  )
}
