import { Container } from "@/components/common/container"
import { CheckoutForm } from "@/features/checkout/components/checkout-form"
import { getCourses } from "@/features/courses/services/catalog"
import { formatPrice } from "@/lib/format"

// No payment here: the student sends their details and the council follows up. The course list comes from the API, so unlike
// the contact page this one needs it (there is nothing to buy without a course).
export async function CheckoutPage({ course }: { course?: string }) {
  const courses = await getCourses()
  const items = courses.map((c) => ({ value: c.slug, label: c.title }))
  const picked = courses.find((c) => c.slug === course)

  return (
    <section className="py-12 md:py-20">
      <Container className="flex max-w-3xl flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-display-md font-semibold md:text-display-xl">
            Enrol in a course
          </h1>
          <p className="text-lg text-muted-foreground">
            Fill in your details and our team will contact you to complete your
            enrolment. No payment is taken here.
          </p>
        </div>
        {picked && (
          <p className="flex flex-wrap items-baseline justify-between gap-2 rounded-2xl bg-neutral-100 px-6 py-4">
            <span className="font-semibold">{picked.title}</span>
            <span className="text-muted-foreground">
              {formatPrice(picked.price)} · one-time
            </span>
          </p>
        )}
        <div className="rounded-3xl bg-neutral-50 p-6 md:p-10">
          <CheckoutForm courses={items} course={picked?.slug} />
        </div>
      </Container>
    </section>
  )
}
