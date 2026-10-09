import { cn } from "cn"
import { Clock, Mail, MapPin, type LucideIcon } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { siteConfig } from "@/config/site"

// The left box: how to reach the council without the form.
export function ContactDetails() {
  return (
    <div className="flex flex-col gap-8 rounded-3xl bg-neutral-100 p-6 md:p-10">
      <h2 className="text-display-xs font-semibold md:text-display-sm">
        Get in touch
      </h2>
      <dl className="flex flex-col gap-6">
        <Detail icon={Mail} title="Email">
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-foreground"
          >
            {siteConfig.email}
          </a>
        </Detail>
        <Detail icon={MapPin} title="Visit us">
          <address className="not-italic">{siteConfig.address}</address>
        </Detail>
        <Detail icon={Clock} title="Response time">
          Within 1–2 working days
        </Detail>
      </dl>
      <p className="text-lg text-label">
        {
          "Questions about a course, enrolment or your certificate? Our team will help you choose the right course and answer anything you need."
        }
      </p>
      <div className="flex flex-col items-start gap-4">
        <a
          href={`mailto:${siteConfig.email}`}
          className={cn(buttonVariants({ size: "xl" }), "rounded-full")}
        >
          Email us
        </a>
        <p className="text-sm text-muted-foreground">
          {"Verifying a certificate?"}{" "}
          <Link
            href={routes.certificate()}
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            Use the online check
          </Link>
        </p>
      </div>
    </div>
  )
}

type DetailProps = {
  icon: LucideIcon
  title: string
  children: React.ReactNode
}

function Detail({ icon: Icon, title, children }: DetailProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-lg font-semibold">{title}</dt>
      <dd className="flex items-start gap-2.5 text-base text-muted-foreground">
        <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
        {children}
      </dd>
    </div>
  )
}
