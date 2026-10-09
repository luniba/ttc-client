import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ButtonSection } from "@/features/design-system/components/button-section"
import { ChoiceSection } from "@/features/design-system/components/choice-section"
import { ColorSection } from "@/features/design-system/components/color-section"
import { InputSection } from "@/features/design-system/components/input-section"
import { OverlaySection } from "@/features/design-system/components/overlay-section"
import { TypographySection } from "@/features/design-system/components/typography-section"
import { isDev } from "@/lib/env"

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false },
}

export default function DesignSystemPage() {
  if (!isDev) notFound()

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-16 px-8 py-12">
      <header className="flex flex-col gap-2">
        <h1 className="text-display-sm font-semibold">Design system</h1>
        <p className="text-lg text-muted-foreground">
          Every component and state, built from components/*.md. Hover, press
          and Tab through the controls to see interactive states.
        </p>
      </header>
      <ColorSection />
      <TypographySection />
      <ButtonSection />
      <InputSection />
      <ChoiceSection />
      <OverlaySection />
    </main>
  )
}
