// Admin panel areas; each lives at /admin/<area>.
export const appAreas = [
  "courses",
  "candidates",
  "orders",
  "verification",
  "settings",
] as const
export type AppArea = (typeof appAreas)[number]

export const routes = {
  home: () => "/",
  about: () => `/about`,
  program: () => `/tesol-and-tefl-course`,
  courses: () => `/courses`,
  course: (slug: string) => `/courses/${slug}`,
  courseModule: (slug: string, moduleId: string) =>
    `/courses/${slug}/module/${moduleId}`,
  certificate: () => `/certificate`,
  contact: (course?: string) =>
    `/contact` + (course ? `?${new URLSearchParams({ course })}` : ""),
  account: () => `/account`,
  accountProfile: () => `/account/profile`,
  accountSettings: () => `/account/settings`,
  checkout: (course?: string) =>
    `/checkout` + (course ? `?${new URLSearchParams({ course })}` : ""),
  download: () => `/download-tesol-course`,
  privacy: () => `/privacy`,
  terms: () => `/terms`,
  admin: (area?: AppArea) => `/admin` + (area ? `/${area}` : ""),
  newCourse: () => "/admin/courses/new",
  adminCourse: (id: string) => `/admin/courses/${id}`,
  adminModule: (courseId: string, moduleId: string) =>
    `/admin/courses/${courseId}/modules/${moduleId}`,
  newCandidate: () => "/admin/candidates/new",
  adminCandidate: (id: string) => `/admin/candidates/${id}`,
  editCandidate: (id: string) => `/admin/candidates/${id}/edit`,
  newOrder: () => "/admin/orders/new",
  adminOrder: (id: string) => `/admin/orders/${id}`,
  login: (next?: string) =>
    `/login` + (next ? `?${new URLSearchParams({ next })}` : ""),
  forgotPassword: () => `/forgot-password`,
}
