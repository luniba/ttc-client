import { routes } from "@/config/routes"
import { siteConfig } from "@/config/site"

type FooterLink = { href: string; label: string }

export const footerColumns: { title: string; items: FooterLink[] }[] = [
  {
    title: "Courses",
    items: [
      { href: routes.program(), label: "TESOL & TEFL" },
      { href: routes.courses(), label: "All courses" },
      { href: routes.download(), label: "Free course guide" },
    ],
  },
  {
    title: "Council",
    items: [
      { href: routes.about(), label: "About" },
      { href: routes.certificate(), label: "Verify certificate" },
      { href: routes.login(), label: "Log in" },
    ],
  },
  {
    title: "Contact",
    items: [
      { href: routes.contact(), label: "Send us a message" },
      {
        href: `mailto:${siteConfig.email}`,
        label: "info@tesolteflcouncil.com",
      },
    ],
  },
]

export const footerMore: FooterLink[] = [
  { href: routes.privacy(), label: "Privacy policy" },
  { href: routes.terms(), label: "Terms & conditions" },
]
