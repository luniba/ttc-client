import type { Metadata } from "next"

import { CheckoutPage } from "@/features/checkout/components/checkout-page"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...buildMetadata({
    path: "/checkout",
    title: "Enrol in a course",
    description:
      "Request a TESOL or TEFL course. Send your details and our team will contact you to complete your enrolment.",
  }),
  // A form, not content: nothing here to put in search results.
  robots: { index: false, follow: true },
}

// Reads the course list at request time and the API may be down at build, so it is never prerendered (same as /courses).
export const dynamic = "force-dynamic"

export default async function Page({ searchParams }: PageProps<"/checkout">) {
  const { course } = await searchParams
  return (
    <CheckoutPage course={typeof course === "string" ? course : undefined} />
  )
}
