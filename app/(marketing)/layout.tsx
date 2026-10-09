import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { CtaBand } from "@/features/marketing/components/cta-band"

// .site-dark switches the public site to its dark navy and gold theme (see globals.css).
export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="site-dark">
      <SiteHeader />
      <main>
        {children}
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  )
}
