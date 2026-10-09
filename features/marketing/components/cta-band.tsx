import { cn } from "cn"
import Link from "next/link"

import { Container } from "@/components/common/container"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { NewsletterForm } from "@/features/marketing/components/newsletter-form"

// Above the footer on every public page: enrol call to action, then the newsletter.
export function CtaBand() {
  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 text-center md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/5"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-primary/5"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-display-sm font-semibold text-balance md:text-display-md">
              Register for your 120-hour TESOL & TEFL course today
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              {
                "Get certified in less than four weeks and start teaching English online or abroad."
              }
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href={routes.courses()}
                className={cn(buttonVariants({ size: "xl" }), "rounded-full")}
              >
                Begin now
              </Link>
              <Link
                href={routes.contact()}
                className={cn(
                  buttonVariants({ variant: "outline", size: "xl" }),
                  "rounded-full"
                )}
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">
              Sign up for our newsletter
            </h2>
            <p className="text-base text-muted-foreground">
              Course news, teaching tips and job opportunities. No spam.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </Container>
    </section>
  )
}
