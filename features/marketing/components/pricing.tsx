import { cn } from "cn"
import Link from "next/link"
import type { ReactNode } from "react"

import { Container } from "@/components/common/container"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { getCoursesOrEmpty } from "@/features/courses/services/catalog"
import { PriceCard } from "@/features/marketing/components/price-card"
import { SectionHeading } from "@/features/marketing/components/section-heading"

const featured = [
  { slug: "advanced-120-hour-tefl-course", name: "TEFL" },
  { slug: "advanced-120-hour-tesol-course", name: "TESOL" },
]

// The two 120-hour courses, priced from the API. Hidden if neither is published; a fetch failure
// hides it too rather than taking the home page down with it.
export async function Pricing() {
  const courses = await getCoursesOrEmpty()
  const shown = featured.flatMap(({ slug, name }) => {
    const course = courses.find((c) => c.slug === slug)
    return course ? [{ course, name }] : []
  })
  if (shown.length === 0) return null

  const features = (name: string) => [
    "Best for jobs",
    "Lifetime job support",
    "Accredited certificate",
    `Global ${name} certificate`,
    "Personalised certificate",
    "Teaching English to young learners",
    "ESP: English for specific purposes",
    "Authentication service",
    "Extra resources",
    "Fast-track certification",
  ]

  return (
    <PricingSection>
      {shown.map(({ course, name }) => {
        const { slug } = course
        return (
          <PriceCard
            key={slug}
            title={course.title}
            price={course.price}
            priceNote="one-time payment"
            badges={["Globally recognised", "Best price"]}
            features={features(name)}
            enroll={{
              href: routes.checkout(slug),
              label: "Enroll now",
            }}
            details={{
              href: routes.course(slug),
              label: "View course",
            }}
          />
        )
      })}
    </PricingSection>
  )
}

function PricingSection({ children }: { children: ReactNode }) {
  return (
    <section id="pricing" className="scroll-mt-20 bg-brand-25 py-16 md:py-24">
      <Container className="flex flex-col gap-12 md:gap-16">
        <SectionHeading
          eyebrow="Pricing"
          title="One simple course fee"
          description="Pay once and keep lifetime access to your course, resources and job support."
        />
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 md:grid-cols-2">{children}</div>
          <ExtraResources />
        </div>
      </Container>
    </section>
  )
}

// Suspense fallback while the prices load.
export function PricingSkeleton() {
  return (
    <PricingSection>
      {Array.from({ length: 2 }, (_, i) => (
        <div
          key={i}
          aria-hidden
          className="h-[620px] animate-pulse rounded-2xl bg-card"
        />
      ))}
    </PricingSection>
  )
}

// Full width under the two course cards: text on the left, button on the right.
function ExtraResources() {
  return (
    <article className="flex flex-col gap-6 rounded-2xl border border-primary/30 bg-card p-6 md:flex-row md:items-center md:gap-8 md:p-8">
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-display-xs font-semibold">Extra resources</h3>
        <p className="text-lg text-muted-foreground">
          {
            "Additional study material worth more than $1,000 to help you study better and teach with confidence."
          }
        </p>
      </div>
      <Link
        href={routes.contact()}
        className={cn(
          buttonVariants({ size: "xl" }),
          "shrink-0 self-start rounded-full md:self-center"
        )}
      >
        Ask about resources
      </Link>
    </article>
  )
}
