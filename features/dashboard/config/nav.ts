import {
  Book1,
  Element3,
  Profile2User,
  Receipt2,
  Setting2,
  ShieldTick,
  type Icon,
} from "iconsax-reactjs"

import type { AppArea } from "@/config/routes"

// No area means the dashboard home.
export type NavItem = { area?: AppArea; label: string; icon: Icon }

export const mainNav: NavItem[] = [
  { label: "Home", icon: Element3 },
  { area: "courses", label: "Courses", icon: Book1 },
  { area: "candidates", label: "Candidates", icon: Profile2User },
  { area: "orders", label: "Orders", icon: Receipt2 },
  { area: "verification", label: "Verification", icon: ShieldTick },
]

export const footerNav: NavItem[] = [
  { area: "settings", label: "Settings", icon: Setting2 },
]

export const allNav = [...mainNav, ...footerNav]
