import type { Metadata } from "next"

import { ContactPage } from "@/features/contact/components/contact-page"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  path: "/contact",
  title: "Contact Us",
  description:
    "Questions about our TESOL and TEFL courses, enrolment or certificates? Send us a message.",
})

export default async function Page({ searchParams }: PageProps<"/contact">) {
  const { course } = await searchParams
  return (
    <ContactPage course={typeof course === "string" ? course : undefined} />
  )
}
