import { env } from "@/lib/env"

export const siteConfig = {
  name: "TESOL TEFL Council",
  shortName: "TTC",
  url: env.NEXT_PUBLIC_SITE_URL,
  email: "info@tesolteflcouncil.com",
  address: "628 Carriage Ave. Santa Clara, CA 95050",
  // Shown to people who need an answer faster than email. Set it to the council's real number; while empty, the checkout page
  // points them to the email address instead.
  phone: "",
}
