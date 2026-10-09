import { Container } from "@/components/common/container"

type Props = { eyebrow?: string; title: string; description?: string }

// The top of every inner public page.
export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="bg-muted py-16 md:py-24">
      <Container className="flex flex-col items-center gap-4 text-center md:gap-6">
        {eyebrow && (
          <p className="text-sm font-semibold text-brand-700 md:text-base">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl text-display-md font-semibold text-balance md:text-display-lg">
          {title}
        </h1>
        {description && (
          <p className="max-w-3xl text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
        )}
      </Container>
    </section>
  )
}
