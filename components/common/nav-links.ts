import { routes } from "@/config/routes"

export const navLinks: { href: string; label: string }[] = [
  { href: routes.about(), label: "About" },
  { href: routes.program(), label: "TESOL & TEFL" },
  { href: routes.courses(), label: "All courses" },
  { href: routes.certificate(), label: "Verify certificate" },
  { href: routes.contact(), label: "Contact" },
]
