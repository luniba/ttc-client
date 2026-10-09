import type { Metadata } from "next"
import { Suspense } from "react"

import { Explainer } from "@/features/marketing/components/explainer"
import { Gallery } from "@/features/marketing/components/gallery"
import { Hero } from "@/features/marketing/components/hero"
import { Involved } from "@/features/marketing/components/involved"
import {
  Pricing,
  PricingSkeleton,
} from "@/features/marketing/components/pricing"
import { Testimonials } from "@/features/marketing/components/testimonials"
import { WhyTtc } from "@/features/marketing/components/why-ttc"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  path: "",
  title: "Accredited TESOL & TEFL courses online",
  description:
    "Accredited 120-hour and 180-hour TESOL and TEFL courses, 100% online. Get certified and teach English online or abroad.",
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <Explainer />
      <Involved />
      <Suspense fallback={<PricingSkeleton />}>
        <Pricing />
      </Suspense>
      <WhyTtc />
      <Testimonials />
      <Gallery />
    </>
  )
}
