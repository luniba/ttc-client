import { cn } from "cn"
import Link from "next/link"
import type { ReactNode } from "react"

import { Container } from "@/components/common/container"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { VerifyForm } from "@/features/certificate/components/verify-form"

// Laid out like the contact page: a soft info box beside a soft form box.
export function CertificatePage() {
  return (
    <section className="py-12 md:py-20">
      <Container className="flex flex-col gap-10 md:gap-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-display-md font-semibold md:text-display-xl">
            Verify a Certificate
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Employers and agencies can confirm a TTC certificate is genuine in
            seconds.
          </p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-8 rounded-3xl bg-neutral-100 p-6 md:p-10">
            <h2 className="text-display-xs font-semibold md:text-display-sm">
              How it works
            </h2>
            <dl className="flex flex-col gap-6">
              <Step title="Enter the details">
                The holder&apos;s name, passport number and certificate number,
                exactly as printed.
              </Step>
              <Step title="We check our register">
                Every certificate we issue is recorded with its holder.
              </Step>
              <Step title="See the result">
                A genuine certificate shows its holder, course and issue date.
              </Step>
            </dl>
            <div className="flex flex-col items-start gap-4">
              <p className="text-lg text-label">
                Are you a TTC student? Log in to continue your course, see your
                progress and download your certificate.
              </p>
              <Link
                href={routes.login()}
                className={cn(buttonVariants({ size: "xl" }), "rounded-full")}
              >
                Log in
              </Link>
              <p className="text-sm text-muted-foreground">
                Need help?{" "}
                <Link
                  href={routes.contact()}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  Contact us
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 rounded-3xl bg-neutral-50 p-6 md:p-10">
            <h2 className="text-display-xs font-semibold md:text-display-sm">
              Certificate details
            </h2>
            <VerifyForm />
          </div>
        </div>
      </Container>
    </section>
  )
}

type StepProps = { title: string; children: ReactNode }

function Step({ title, children }: StepProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-lg font-semibold">{title}</dt>
      <dd className="text-base text-muted-foreground">{children}</dd>
    </div>
  )
}
