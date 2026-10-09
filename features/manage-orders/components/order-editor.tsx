"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { FormProvider, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import type { z } from "zod"

import { BackLink } from "@/components/custom/back-link"
import { LoadingButton } from "@/components/custom/loading-button"
import { routes } from "@/config/routes"
import { OrderFields } from "@/features/manage-orders/components/order-fields"
import {
  adminOrders,
  orderSchema,
  toOrderForm,
  toOrderPayload,
  type Order,
  type OrderForm,
} from "@/features/manage-orders/services/orders"
import { getErrorKey } from "@/lib/axios"

// The add / edit page body. The order number is generated on create and never edited.
export function OrderEditor({ order }: { order?: Order }) {
  const router = useRouter()
  const save = adminOrders.useSave()
  const form = useForm<OrderForm, unknown, z.output<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: toOrderForm(order),
  })

  const onSubmit = form.handleSubmit((values) =>
    save.mutate(
      { id: order?.id, body: toOrderPayload(values) },
      {
        onSuccess: (saved) => {
          toast.success(
            order ? "Order updated" : `Order ${saved.orderNo} created`
          )
          router.push(routes.admin("orders"))
        },
        onError: (e) => toast.error(getErrorKey(e)),
      }
    )
  )

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <BackLink href={routes.admin("orders")}>All orders</BackLink>
        <h2 className="text-xl font-semibold">
          {order ? `Order ${order.orderNo}` : "New order"}
        </h2>
      </div>
      <FormProvider {...form}>
        <form
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col gap-6 rounded-2xl bg-neutral-50 p-6 sm:p-8"
        >
          <OrderFields />
          <div>
            <LoadingButton
              type="submit"
              loading={save.isPending}
              disabled={!!order && !form.formState.isDirty}
            >
              {order ? "Save changes" : "Create order"}
            </LoadingButton>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
