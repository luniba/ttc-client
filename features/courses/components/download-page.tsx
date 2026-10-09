import { cn } from "cn"
import { Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/common/container"
import { buttonVariants } from "@/components/ui/button"
import { routes } from "@/config/routes"
import book from "@/public/images/book-one.jpg"

export function DownloadPage() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="mx-auto w-full max-w-sm">
          <Image
            src={book}
            alt="The TESOL TEFL Council course book"
            placeholder="blur"
            priority
            sizes="(min-width: 768px) 384px, 80vw"
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>
        <div className="flex flex-col items-start gap-6">
          <p className="text-sm font-semibold text-brand-700 md:text-base">
            Free course guide
          </p>
          <h1 className="text-display-md font-semibold text-balance md:text-display-lg">
            {"See what's inside the TESOL course"}
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            {
              "Download the course guide to preview the content, modules and certificate before you enrol."
            }
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/files/tesol-course-content.pdf"
              download
              className={cn(buttonVariants({ size: "xl" }), "rounded-full")}
            >
              <Download aria-hidden />
              Download PDF
            </a>
            <Link
              href={routes.courses()}
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "rounded-full"
              )}
            >
              Browse courses
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
