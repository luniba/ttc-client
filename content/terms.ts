import type { PolicySection } from "@/content/privacy"
import { siteConfig } from "@/config/site"

// ponytail: draft written for the rebuild (the old terms page was empty); have it reviewed by a
// lawyer, including the refund terms, before launch.
export const terms: PolicySection[] = [
  {
    paragraphs: [
      `These terms apply when you use the ${siteConfig.name} website, enrol in a course or verify a certificate. By using the site you agree to them.`,
    ],
  },
  {
    heading: "Your account",
    paragraphs: [
      "Keep your login details private; you are responsible for activity on your account. Give accurate information, especially your name as it should appear on your certificate.",
    ],
  },
  {
    heading: "Courses and access",
    paragraphs: [
      "Course fees are shown on each course page. Once your enrolment is confirmed you get access to the course for the period stated on the course page. Course materials are for your personal study only and may not be shared or resold.",
    ],
  },
  {
    heading: "Certificates",
    paragraphs: [
      "A certificate is issued when you complete the course requirements. Certificates are issued in the name you provide and can be verified on this website. We may revoke a certificate obtained through cheating or false information.",
    ],
  },
  {
    heading: "Payments and refunds",
    paragraphs: [
      `If you have a problem with a payment or want to ask about a refund, contact us at ${siteConfig.email} and we will review your request.`,
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: [
      "Do not attempt to access other people's accounts, interfere with the site, or use certificate verification to collect other people's personal information.",
    ],
  },
  {
    heading: "Liability",
    paragraphs: [
      "We work to keep the site and courses accurate and available, but we cannot guarantee uninterrupted access or particular employment outcomes. Nothing in these terms limits rights you have under the law.",
    ],
  },
  {
    heading: "Changes and contact",
    paragraphs: [
      `We may update these terms; the date at the top shows the latest version. Questions: ${siteConfig.email}.`,
    ],
  },
]
