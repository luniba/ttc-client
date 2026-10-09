"use client"

import { Add, Receipt2 } from "iconsax-reactjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

import { PageIntro } from "@/components/custom/page-intro"
import { ResourceTable } from "@/components/custom/resource-table"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import {
  OrderCard,
  useOrderColumns,
} from "@/features/manage-orders/components/order-columns"
import {
  adminOrders,
  type Order,
} from "@/features/manage-orders/services/orders"
import { useDeleteConfirm } from "@/hooks/use-delete-confirm"
import { useTableLabels } from "@/hooks/use-table-labels"
import { useTableState } from "@/hooks/use-table-state"

// Adding and editing open their own pages.
export function OrdersPage() {
  const router = useRouter()
  const table = useTableState()
  const page = adminOrders.usePage(table.params)
  const labels = useTableLabels()
  const del = useDeleteConfirm<Order>({
    remove: adminOrders.useRemove(),
    title: "Delete this order?",
    describe: (o) =>
      `Order ${o.orderNo} for ${o.candidate.passportName} will be removed from the order list.`,
    done: "Order deleted",
    onDone: () => table.afterDelete(page.data?.data.length ?? 0),
  })
  const actions = {
    onEdit: useCallback(
      (o: Order) => router.push(routes.adminOrder(o.id)),
      [router]
    ),
    onDelete: del.ask,
  }
  const columns = useOrderColumns(actions)

  const add = (
    <Link href={routes.newOrder()} className={buttonVariants()}>
      <Add size={20} color="currentColor" aria-hidden />
      New order
    </Link>
  )

  return (
    <div className="flex flex-col gap-6">
      <PageIntro action={page.data?.pagination.total ? add : undefined}>
        Course orders recorded for candidates. Each gets an order number when
        created.
      </PageIntro>
      <ResourceTable
        query={page}
        state={table}
        columns={columns}
        rowId={(o) => o.id}
        mobile={(o) => <OrderCard order={o} {...actions} />}
        labels={labels}
        label="Orders"
        searchPlaceholder="Search by order number, candidate or email"
        loadError="Couldn't load orders."
        empty={{
          icon: Receipt2,
          title: "No orders yet",
          description:
            "Create an order for a candidate and its order number is generated for you.",
          action: add,
        }}
      />
      {del.dialog}
    </div>
  )
}
