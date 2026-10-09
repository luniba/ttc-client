import { Quote } from "lucide-react"
import Image from "next/image"

import { Container } from "@/components/common/container"
import { testimonials } from "@/content/testimonials"
import { SectionHeading } from "@/features/marketing/components/section-heading"

export function Testimonials() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <Container className="flex flex-col gap-12 md:gap-16">
        <SectionHeading eyebrow="Testimonials" title="What our graduates say" />
        <ul className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <li
              key={item.name}
              className="flex flex-col justify-between gap-8 rounded-2xl border border-neutral-200 bg-card p-6 shadow-xs md:p-8"
            >
              <figure className="flex flex-col gap-5">
                <Quote className="size-8 text-brand-300" aria-hidden />
                <blockquote className="text-lg text-foreground">
                  {item.quote}
                </blockquote>
              </figure>
              <div className="flex items-center gap-3">
                <Image
                  src={item.photo}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-base font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {`Student, ${item.course}`}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
