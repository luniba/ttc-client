import { cn } from "cn"
import Image from "next/image"

import { Container } from "@/components/common/container"
import { SectionHeading } from "@/features/marketing/components/section-heading"
import one from "@/public/images/gallery-1.jpg"
import two from "@/public/images/gallery-2.jpg"
import three from "@/public/images/gallery-3.jpg"

export function Gallery() {
  const photos = [
    { src: one, alt: "A smiling student" },
    { src: two, alt: "Students studying together" },
    { src: three, alt: "TESOL TEFL Council course book" },
  ]

  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-12 md:gap-16">
        <SectionHeading eyebrow="Gallery" title="Learning around the world" />
        <div className="grid gap-4 sm:grid-cols-3 md:gap-6">
          {photos.map((p, i) => (
            <div
              key={p.alt}
              className={cn(
                "relative aspect-3/4 overflow-hidden rounded-3xl bg-muted",
                i === 1 && "sm:translate-y-8"
              )}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
