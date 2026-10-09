import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { z } from "zod"

import type { Option } from "@/components/custom/search-combobox"
import { adminCandidates } from "@/features/manage-candidates/services/candidates"
import { adminCourses } from "@/features/manage-courses/services/courses"
import { api } from "@/lib/axios"
import { formatPrice } from "@/lib/format"
import { resource } from "@/lib/resource"
import { requiredDate } from "@/lib/validation"

export const orderStatuses = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
] as const
export type OrderStatus = (typeof orderStatuses)[number]["value"]

// Shape from GET /admin/orders. Item titles and prices were copied when each course was added.
export type Order = {
  id: string
  orderNo: string
  candidate: {
    id: string
    passportName: string
    email: string
    certificateId: string
  }
  items: { courseId: string; title: string; price: number }[]
  total: number
  status: OrderStatus
  orderedAt: string
  createdAt: string
  updatedAt: string
}

export type OrderPayload = {
  candidateId: string
  courseIds: string[]
  orderedAt: string
  status: OrderStatus
}

export const adminOrders = resource<Order, OrderPayload>("admin/orders")

export const useOrder = (id: string) =>
  useQuery({
    queryKey: [...adminOrders.key, id],
    queryFn: async () =>
      (await api.get<{ data: Order }>(`/admin/orders/${id}`)).data.data,
  })

// A picked course carries its price, so the form can show the total before saving.
export type CourseOption = Option & { price: number }

const option = z.object({ value: z.string(), label: z.string() })

export const orderSchema = z.object({
  candidate: option.nullable().refine((c) => c !== null, "Choose a candidate"),
  courses: z
    .array(option.extend({ price: z.number() }))
    .min(1, "Choose at least one course"),
  day: requiredDate,
  time: z.string().regex(/^\d{2}:\d{2}$/, "Enter the time"),
  status: z.enum(orderStatuses.map((s) => s.value)),
})

export type OrderForm = z.input<typeof orderSchema>

// Date and time are read in the admin's own time zone and sent as an exact instant.
export const toOrderPayload = (
  v: z.output<typeof orderSchema>
): OrderPayload => ({
  candidateId: v.candidate!.value,
  courseIds: v.courses.map((c) => c.value),
  orderedAt: new Date(`${v.day}T${v.time}`).toISOString(),
  status: v.status,
})

export const toOrderForm = (o?: Order): OrderForm => {
  const at = o ? new Date(o.orderedAt) : new Date()
  return {
    candidate: o
      ? { value: o.candidate.id, label: o.candidate.passportName }
      : null,
    courses:
      o?.items.map((i) => ({
        value: i.courseId,
        label: i.title,
        price: i.price,
      })) ?? [],
    day: format(at, "yyyy-MM-dd"),
    time: format(at, "HH:mm"),
    status: o?.status ?? "pending",
  }
}

// Searches for the comboboxes: the first 20 matches.
export function useCandidateSearch(q: string) {
  const page = adminCandidates.usePage({ page: 1, limit: 20, q })
  return {
    loading: page.isFetching,
    items: (page.data?.data ?? []).map((c): Option => ({
      value: c.id,
      label: c.passportName,
      hint: `${c.certificateId} · ${c.email}`,
    })),
  }
}

export function useCourseSearch(q: string) {
  const page = adminCourses.usePage({ page: 1, limit: 20, q })
  return {
    loading: page.isFetching,
    items: (page.data?.data ?? []).map((c): CourseOption => ({
      value: c.id,
      label: c.title,
      hint: formatPrice(c.price),
      price: c.price,
    })),
  }
}
