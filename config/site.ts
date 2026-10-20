import { env } from "@/lib/env"

export const siteConfig = {
  name: "TESOL TEFL Council",
  shortName: "TTC",
  url: env.NEXT_PUBLIC_SITE_URL,
  email: "info@tesolteflcouncil.com",
  address: "628 Carriage Ave. Santa Clara, CA 95050",
  // For people who need a faster answer than email; empty falls back to the email address.
  phone: "",
}
