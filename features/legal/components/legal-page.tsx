import { Container } from "@/components/common/container"
import type { PolicySection } from "@/content/privacy"

type Props = {
  updated: string
  title: string
  description: string
  sections: PolicySection[]
}

export function LegalPage({ updated, title, description, sections }: Props) {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container className="flex flex-col items-center gap-4 text-center md:gap-6">
          <p className="text-sm font-semibold text-brand-700 md:text-base">
            {updated}
          </p>
          <h1 className="text-display-md font-semibold md:text-display-lg">
            {title}
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
        </Container>
      </section>
      <Container>
        <article className="mx-auto flex max-w-[45rem] flex-col gap-12">
          {sections.map((section, i) => (
            <section
              key={section.heading ?? i}
              className="flex flex-col gap-4 md:gap-6"
            >
              {section.heading && (
                <h2 className="text-display-xs font-semibold md:text-display-sm">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p) => (
                <p key={p} className="text-lg text-muted-foreground">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </Container>
    </>
  )
}
