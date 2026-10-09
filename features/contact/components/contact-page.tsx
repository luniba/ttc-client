import { Container } from "@/components/common/container"
import { ContactDetails } from "@/features/contact/components/contact-details"
import { ContactForm } from "@/features/contact/components/contact-form"
import { getCoursesOrEmpty } from "@/features/courses/services/catalog"

// The course list is a convenience; the form still works if the API is down.
export async function ContactPage({ course }: { course?: string }) {
  const items = (await getCoursesOrEmpty()).map((c) => ({
    value: c.slug,
    label: c.title,
  }))
  const known = items.some((i) => i.value === course) ? course : undefined

  return (
    <section className="py-12 md:py-20">
      <Container className="flex flex-col gap-10 md:gap-16">
        <h1 className="text-center text-display-md font-semibold md:text-display-xl">
          Contact Us
        </h1>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <ContactDetails />
          <div className="flex flex-col gap-8 rounded-3xl bg-neutral-50 p-6 md:p-10">
            <h2 className="text-display-xs font-semibold md:text-display-sm">
              Message
            </h2>
            <ContactForm courses={items} course={known} />
          </div>
        </div>
      </Container>
    </section>
  )
}
