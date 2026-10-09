import { Badge } from "@/components/ui/badge"
import {
  orderStatuses,
  type OrderStatus,
} from "@/features/manage-orders/services/orders"

const variants = {
  pending: "warning",
  processing: "info",
  completed: "success",
  cancelled: "gray",
  failed: "destructive",
  refunded: "gray",
} as const

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant={variants[status]}>
      {orderStatuses.find((s) => s.value === status)!.label}
    </Badge>
  )
}
