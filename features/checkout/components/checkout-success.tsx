import { CircleCheck } from "lucide-react"
import Link from "next/link"

import { FeaturedIcon } from "@/components/custom/featured-icon"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import { siteConfig } from "@/config/site"
import { cn } from "cn"

export function CheckoutSuccess() {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 py-10 text-center"
    >
      <FeaturedIcon icon={CircleCheck} size="2xl" />
      <h2 className="text-display-xs font-semibold">
        Thanks, we&apos;ve received your request
      </h2>
      <p className="max-w-md text-base text-muted-foreground">
        We have notified our team and they will contact you very soon.
        We&apos;ve also emailed you a confirmation with your login details.
      </p>
      <p className="max-w-md text-base text-muted-foreground">
        If it&apos;s urgent, you can reach us{" "}
        {siteConfig.phone ? (
          <>
            on{" "}
            <a
              href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
              className="font-semibold text-foreground hover:underline"
            >
              {siteConfig.phone}
            </a>
          </>
        ) : (
          <>
            at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-foreground hover:underline"
            >
              {siteConfig.email}
            </a>
          </>
        )}
        .
      </p>
      <Link
        href={routes.courses()}
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "rounded-full"
        )}
      >
        Browse more courses
      </Link>
    </div>
  )
}
