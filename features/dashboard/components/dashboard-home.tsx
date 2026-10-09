"use client"

import { Sms } from "iconsax-reactjs"

import { Badge } from "@/components/ui/badge"
import { routes } from "@/config/routes"
import { useAuth, type Role } from "@/features/auth/services/me"
import { AreaLink } from "@/features/dashboard/components/area-link"
import { PageSection } from "@/features/dashboard/components/page-section"
import { mainNav } from "@/features/dashboard/config/nav"

const areas = [
  {
    area: "courses",
    title: "Courses",
    description:
      "Create courses, set prices and build the curriculum students see.",
  },
  {
    area: "candidates",
    title: "Candidates",
    description:
      "Record certificate holders and the details behind online verification.",
  },
  {
    area: "orders",
    title: "Orders",
    description: "Record course orders for candidates and track their status.",
  },
] as const

const roleLabels: Record<Role, string> = {
  admin: "Admin",
  instructor: "Instructor",
  student: "Student",
}

export function DashboardHome() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <div className="flex flex-col gap-12">
      <PageSection
        title={`Welcome back, ${user.name}`}
        description="Everything you manage for TESOL TEFL Council, in one place."
      >
        <ul className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
          {areas.map(({ area, title, description }) => (
            <AreaLink
              key={area}
              title={title}
              description={description}
              href={routes.admin(area)}
              icon={mainNav.find((n) => n.area === area)!.icon}
              actionLabel="Open"
            />
          ))}
        </ul>
      </PageSection>
      <PageSection
        title="Your account"
        description="Change your name or password in settings."
      >
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200 p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-brand-600">
            <Sms size={20} color="currentColor" aria-hidden />
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-[15px] font-medium">{user.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
          <Badge variant="gray">{roleLabels[user.role]}</Badge>
        </div>
      </PageSection>
    </div>
  )
}
