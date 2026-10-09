import type { MetadataRoute } from "next"

import { routes } from "@/config/routes"
import { siteConfig } from "@/config/site"
import { getCoursesOrEmpty } from "@/features/courses/services/catalog"

// Public pages only; the admin panel lives behind login.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await getCoursesOrEmpty()
  return [
    routes.home(),
    routes.about(),
    routes.program(),
    routes.courses(),
    ...courses.map((c) => routes.course(c.slug)),
    routes.certificate(),
    routes.contact(),
    routes.download(),
    routes.privacy(),
    routes.terms(),
  ].map((path) => ({ url: new URL(path, siteConfig.url).href }))
}
