import {
  BadgeCheck,
  Briefcase,
  Globe,
  Lightbulb,
  Stamp,
  Truck,
} from "lucide-react"
import Image from "next/image"

import { Container } from "@/components/common/container"
import { SectionHeading } from "@/features/marketing/components/section-heading"
import photo from "@/public/images/why-ttc.jpg"

export function WhyTtc() {
  const items = [
    {
      icon: Lightbulb,
      title: "Easy to follow",
      text: "Designed by professionals, but simple to understand and practical for your teaching career.",
    },
    {
      icon: Stamp,
      title: "Notarised & authenticated",
      text: "Our certificates can be notarised and authenticated worldwide, guaranteed.",
    },
    {
      icon: BadgeCheck,
      title: "Accredited",
      text: "Our TESOL and TEFL courses are accredited and internationally recognised.",
    },
    {
      icon: Globe,
      title: "Online & self-paced",
      text: "Study at your own pace, from anywhere in the world.",
    },
    {
      icon: Briefcase,
      title: "Lifetime job assistance",
      text: "Whether you want to teach abroad or online, we're here to help.",
    },
    {
      icon: Truck,
      title: "Free shipping",
      text: "Get an electronic certificate immediately, and a printed one shipped to you internationally.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <Container className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="flex flex-col gap-8 lg:sticky lg:top-24 lg:col-span-2">
          <SectionHeading
            align="start"
            eyebrow="Why TTC"
            title="Why choose TESOL TEFL Council?"
            description="Looking to teach English online or abroad? We're a leading TEFL & TESOL course provider with thousands of graduates working worldwide. Our accredited course is accepted worldwide and sought out by employers, and gives you everything you need to start teaching, no experience needed."
          />
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-muted">
            <Image
              src={photo}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:pt-4">
          {items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex flex-col gap-4">
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-base text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
