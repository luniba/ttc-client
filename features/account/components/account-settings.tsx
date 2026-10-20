"use client"

import { UsernameForm } from "@/features/account/components/username-form"
import { useAuth } from "@/features/auth/services/me"
import { PageSection } from "@/features/dashboard/components/page-section"
import { PasswordForm } from "@/features/settings/components/password-form"
import { ProfileForm } from "@/features/settings/components/profile-form"

const box = "rounded-2xl bg-neutral-50 p-6 sm:p-8"

// Name, username and password. The email can't be changed.
export function AccountSettings() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className={box}>
        <PageSection title="Name" description="How we address you.">
          <ProfileForm user={user} />
        </PageSection>
      </div>
      <div className={box}>
        <PageSection
          title="Username"
          description="Pick a name that's easy to remember."
        >
          <UsernameForm user={user} />
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
