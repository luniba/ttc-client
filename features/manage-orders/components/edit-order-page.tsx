"use client"

import { ListError } from "@/components/custom/list-error"
import { OrderEditor } from "@/features/manage-orders/components/order-editor"
import { useOrder } from "@/features/manage-orders/services/orders"

export function EditOrderPage({ id }: { id: string }) {
  const order = useOrder(id)
  if (order.isError)
    return (
      <ListError
        message="Couldn't load this order."
        retryLabel="Try again"
        onRetry={() => order.refetch()}
      />
    )
  if (!order.data)
    return (
      <div className="mx-auto h-96 w-full max-w-3xl animate-pulse rounded-2xl bg-neutral-50" />
    )
  // Keyed so a refetch never fights the form's own state.
  return <OrderEditor key={order.data.id} order={order.data} />
}
