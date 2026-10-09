import { useAuth, type Role } from "@/features/auth/services/me"

// Mirrors the API's @Roles checks so the app can hide what a role cannot do. The API checks
// every request itself; this is only so people are not shown buttons that would fail.
export type Permission = "panel.access" | "courses.manage" | "staff.manage"

const grants: Record<Role, Permission[]> = {
  admin: ["panel.access", "courses.manage", "staff.manage"],
  instructor: ["panel.access", "courses.manage"],
  student: [],
}

export function useCan(permission: Permission) {
  const { user } = useAuth()
  return !!user && grants[user.role].includes(permission)
}
