import {
  BookOpenCheck,
  Ear,
  Mic,
  NotebookPen,
  PencilRuler,
  SpellCheck,
} from "lucide-react"

import { Container } from "@/components/common/container"
import { FeatureGrid } from "@/features/marketing/components/feature-grid"
import { SectionHeading } from "@/features/marketing/components/section-heading"

export function Involved() {
  const items = [
    {
      icon: BookOpenCheck,
      title: "Methodology",
      text: "A thorough review of teaching methods, so you don't get stuck in just one.",
    },
    {
      icon: NotebookPen,
      title: "Lesson planning",
      text: "Develop unique, original lesson plans for the students you teach.",
    },
    {
      icon: SpellCheck,
      title: "Grammar",
      text: "Strengthen your grammar and your confidence in teaching it.",
    },
    {
      icon: Mic,
      title: "Pronunciation & vocabulary",
      text: "Gain an in-depth understanding of pronunciation and vocabulary.",
    },
    {
      icon: PencilRuler,
      title: "Speaking & writing",
      text: "Develop your own speaking and writing skills, and how to teach them.",
    },
    {
      icon: Ear,
      title: "Listening & reading",
      text: "Learn the most effective methods for teaching listening and reading.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-12 md:gap-16">
        <SectionHeading
          eyebrow="What's involved"
          title="What's inside our 120-hour course"
          description="Prepared by the council for anyone who wants to teach English as a second language. You'll finish confident planning lessons, applying your skills and using what you've learned at work."
        />
        <FeatureGrid items={items} />
      </Container>
    </section>
  )
}
