import { cn } from "cn"
import { ArrowRight } from "lucide-react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"

import { Container } from "@/components/common/container"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { SectionHeading } from "@/features/marketing/components/section-heading"
import extra from "@/public/images/resources-mockup.jpg"
import tefl from "@/public/images/tefl-mockup.jpg"
import tesol from "@/public/images/tesol-mockup.jpg"

type Row = { title: string; text: string; href: string; image: StaticImageData }

export function Explainer() {
  const rows: Row[] = [
    {
      title: "TESOL courses",
      text: "Teaching English to Speakers of Other Languages. TESOL certification typically leads to teaching English to non-native speakers living in an English-speaking country, for example teaching immigrants in the UK, USA or Australia.",
      href: routes.course("advanced-120-hour-tesol-course"),
      image: tesol,
    },
    {
      title: "TEFL courses",
      text: "Teaching English as a Foreign Language. This term is used when English is taught in a place where it is not the local language, for example teaching English to students in China.",
      href: routes.course("advanced-120-hour-tefl-course"),
      image: tefl,
    },
    {
      title: "Extra resources",
      text: "Be ready for any role with additional study resources alongside your accredited 120-hour course. Master grammar structure, plan practical lessons, lead flowing conversation and create positive learning environments.",
      href: routes.contact(),
      image: extra,
    },
  ]

  return (
    <section id="courses" className="scroll-mt-20 py-16 md:py-24">
      <Container className="flex flex-col gap-12 md:gap-20">
        <SectionHeading
          eyebrow="Our courses"
          title="TEFL or TESOL: what's the difference?"
          description="It's the question we get asked most. Both terms describe teaching English to non-native speakers, and they are often used interchangeably. Here is what each one means."
        />
        {rows.map((row, i) => (
          <div
            key={row.title}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
          >
            <div
              className={cn(
                "relative aspect-square overflow-hidden rounded-3xl bg-muted",
                i % 2 === 1 && "md:order-last"
              )}
            >
              <Image
                src={row.image}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-display-xs font-semibold md:text-display-sm">
                {row.title}
              </h3>
              <p className="text-lg text-muted-foreground">{row.text}</p>
              <Link
                href={row.href}
                className={cn(
                  buttonVariants({ variant: "link", size: "lg" }),
                  "mt-2"
                )}
              >
                Learn more
                <ArrowRight className="rtl:rotate-180" aria-hidden />
              </Link>
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}
