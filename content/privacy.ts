import { siteConfig } from "@/config/site"

export type PolicySection = { heading?: string; paragraphs: string[] }

// ponytail: draft written for the rebuild (the old site only had the WordPress default); have it
// reviewed by a lawyer and checked against the real payment and email providers before launch.
export const privacyPolicy: PolicySection[] = [
  {
    paragraphs: [
      `${siteConfig.name} ("TTC", "we") provides online TESOL and TEFL courses and certificate verification. This policy explains what information we collect, why, and the choices you have.`,
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "Account and enrolment details: your name, email address, password (stored only as a secure hash), the courses you enrol in and your progress, quiz results and certificates.",
      "Certificate records: the name and passport number printed on or used to verify your certificate, and the certificate ID.",
      "Messages and newsletter: what you send through the contact form, and your email address if you subscribe to our newsletter.",
      "Technical information: IP address, browser type and basic request logs, used to keep the service secure and working.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "To provide your courses, issue and verify certificates, answer your questions, send course and account emails, and, if you subscribed, send our newsletter.",
      "We do not sell your personal information and we do not use it for third-party advertising.",
    ],
  },
  {
    heading: "Certificate verification",
    paragraphs: [
      "Anyone who has your full name, passport number and certificate ID can confirm that your certificate is genuine. A search only confirms a match; it never reveals your details to someone who does not already have them.",
    ],
  },
  {
    heading: "Sharing",
    paragraphs: [
      "We share information only with providers that help us run the service, such as hosting, email delivery and payment processing, and only as needed for that purpose. We may also disclose information when the law requires it.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "We use essential cookies to keep you signed in and to protect your account. We do not use advertising cookies.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "Certificate records are kept for as long as certificates can be verified. Account data is kept while your account is active and deleted on request, except where we must keep it by law. You can unsubscribe from the newsletter at any time.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      `You can ask to see, correct or delete your personal information, or object to how we use it. Write to us at ${siteConfig.email}.`,
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `${siteConfig.name}, ${siteConfig.address}. Email: ${siteConfig.email}.`,
    ],
  },
]
