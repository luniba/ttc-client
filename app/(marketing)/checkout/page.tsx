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
  // A form, not content.
  robots: { index: false, follow: true },
}

// Dynamic: needs the API at request time.
export const dynamic = "force-dynamic"

export default async function Page({ searchParams }: PageProps<"/checkout">) {
  const { course } = await searchParams
  return (
    <CheckoutPage course={typeof course === "string" ? course : undefined} />
  )
}
