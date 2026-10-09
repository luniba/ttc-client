import type { Metadata } from "next"

import { OrderEditor } from "@/features/manage-orders/components/order-editor"

export const metadata: Metadata = { title: "New order" }

export default function Page() {
  return <OrderEditor />
}
