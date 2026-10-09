import type { Metadata } from "next"

import { OrdersPage } from "@/features/manage-orders/components/orders-page"

export const metadata: Metadata = { title: "Orders" }

export default function Page() {
  return <OrdersPage />
}
