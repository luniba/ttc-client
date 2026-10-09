"use client"

import { useAuth } from "@/features/auth/services/me"
import { PageSection } from "@/features/dashboard/components/page-section"
import { PasswordForm } from "@/features/settings/components/password-form"
import { ProfileForm } from "@/features/settings/components/profile-form"

// Same look as the admin form pages: centred, each form in a soft rounded box.
const box = "rounded-2xl bg-neutral-50 p-6 sm:p-8"

export function SettingsPage() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className={box}>
        <PageSection
          title="Profile"
          description="The name other staff see in the panel."
        >
          <ProfileForm user={user} />
        </PageSection>
      </div>
      <div className={box}>
        <PageSection
          title="Password"
          description="Changing it signs you out on every device, including this one."
        >
          <PasswordForm />
        </PageSection>
      </div>
    </div>
  )
}
