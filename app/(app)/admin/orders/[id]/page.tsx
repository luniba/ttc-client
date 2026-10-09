import type { Metadata } from "next"

import { EditOrderPage } from "@/features/manage-orders/components/edit-order-page"

export const metadata: Metadata = { title: "Edit order" }

export default async function Page({
  params,
}: PageProps<"/admin/orders/[id]">) {
  const { id } = await params
  return <EditOrderPage id={id} />
}
