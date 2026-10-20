import type { Metadata } from "next"

import { AccountSettings } from "@/features/account/components/account-settings"

// Not for search results.
export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <AccountSettings />
}
