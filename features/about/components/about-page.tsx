import { cn } from "cn"
import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/common/container"
import { PageHeader } from "@/components/common/page-header"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { SectionHeading } from "@/features/marketing/components/section-heading"
import extra from "@/public/images/about-resources.png"
import tefl from "@/public/images/about-tefl.jpg"
import tesol from "@/public/images/about-tesol.jpg"
import trust from "@/public/images/about-trust.jpg"
import story from "@/public/images/about.jpg"

const cards = [
  {
    image: tesol,
    title: "TESOL course",
    text: "Prepared by the council for anyone interested in teaching English as a second language or to speakers of other languages, as part of ongoing professional development in language teaching and teacher training.",
  },
  {
    image: tefl,
    title: "TEFL course",
    text: "Our experienced EFL teachers developed this 120-hour course and know what it takes to succeed. From engaging material to outstanding personal tutor support, it gets you ready to teach English anywhere in the world.",
  },
  {
    image: extra,
    title: "Extra resources",
    text: "Additional study resources to master grammar structure, plan practical lessons, lead flowing conversation and create positive learning environments.",
  },
]

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="Teach. Enrich. Get qualified."
        description="Teach English abroad and travel the world with a qualification employers trust."
      />
      <section className="py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-display-sm font-semibold md:text-display-md">
              About our work
            </h2>
            <p className="text-lg text-muted-foreground">
              {
                "TESOL TEFL Council is one of the highest-ranked institutes and one of the top TESOL and TEFL training establishments worldwide. The 120-hour TEFL course is the industry standard and is considered one of the best TEFL courses online."
              }
            </p>
            <p className="text-lg text-muted-foreground">
              {
                "With our accredited 120-hour TESOL/TEFL course you can get certified and start teaching English online or abroad in less than four weeks. Respected by employers worldwide, it puts you in the best possible position to land your dream job, and since all our courses are 100% online, you can fit your studies around your life."
              }
            </p>
          </div>
          <Photo src={story} />
        </Container>
      </section>
      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-12 md:gap-16">
          <SectionHeading
            eyebrow="What we offer"
            title="Courses built by experienced teachers"
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {cards.map(({ title, text, image }) => (
              <li key={title} className="flex flex-col gap-5">
                <Photo src={image} className="aspect-4/3" />
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-base text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Photo src={trust} />
          <div className="flex flex-col items-start gap-6">
            <SectionHeading
              align="start"
              eyebrow="Trust and qualification"
              title="A qualification that lasts a lifetime"
              description="With TESOL TEFL Council you receive a trusted TESOL/TEFL qualification for life. Our globally recognised, specialised courses have made our graduates some of the most sought-after teachers in the industry, and we're passionate about supporting you during your studies and beyond."
            />
            <Link
              href={routes.courses()}
              className={cn(buttonVariants({ size: "xl" }), "rounded-full")}
            >
              Explore courses
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

function Photo({
  src,
  className,
}: {
  src: Parameters<typeof Image>[0]["src"]
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative aspect-4/3 overflow-hidden rounded-3xl bg-muted lg:aspect-5/4",
        className
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  )
}
