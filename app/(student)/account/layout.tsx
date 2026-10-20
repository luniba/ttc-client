import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { AccountShell } from "@/features/account/components/account-shell"
import { AuthGate } from "@/features/auth/components/auth-gate"

// Signed-in students only.
export default function StudentLayout({ children }: LayoutProps<"/account">) {
  return (
    <div className="site-dark">
      <SiteHeader />
      <main>
        <AuthGate>
          <AccountShell>{children}</AccountShell>
        </AuthGate>
      </main>
      <SiteFooter />
    </div>
  )
}
