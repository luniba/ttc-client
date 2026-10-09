import { cn } from "cn"
import { Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/common/container"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import hero from "@/public/images/hero.jpg"

export function Hero() {
  const points = ["Accredited", "100% online", "Lifetime access"]

  return (
    <section className="py-12 md:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <p className="text-sm font-semibold text-brand-700 md:text-base">
            Welcome to TESOL TEFL Council
          </p>
          <h1 className="text-display-md font-semibold text-balance md:text-display-xl">
            The best place to learn TESOL & TEFL
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
            {
              "Accredited, internationally recognised courses, 100% online. Get certified at your own pace and start teaching English online or abroad."
            }
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href={routes.courses()}
              className={cn(buttonVariants({ size: "xl" }), "rounded-full")}
            >
              Explore courses
            </Link>
            <Link
              href={routes.certificate()}
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "rounded-full"
              )}
            >
              Verify a certificate
            </Link>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-label">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check className="size-4 text-success" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-muted lg:aspect-square">
          <Image
            src={hero}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  )
}
