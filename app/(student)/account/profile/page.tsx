import type { Metadata } from "next"

import { ProfilePage } from "@/features/account/components/profile-page"

// Not for search results.
export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ProfilePage />
}
