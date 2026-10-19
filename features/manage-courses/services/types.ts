// Shapes from docs/courses-api.md.
export type Category = { id: string; name: string; slug: string }

export type Course = {
  id: string
  slug: string
  title: string
  category: Category
  duration: string
  level: string
  studentCount: string
  description: string
  price: number
  thumbnailKey: string | null
  thumbnailUrl: string | null
  isPublished: boolean
  moduleCount: number
  createdAt: string
  updatedAt: string
}

// A lesson has content and materials; a quiz has questions. Fixed when the module is created.
export type ModuleType = "lesson" | "quiz"

export type ModuleSummary = {
  id: string
  title: string
  type: ModuleType
  durationMinutes: number
  isPreview: boolean
  position: number
  materialCount: number
  questionCount: number
}

// correctIndex (0 = A) comes in admin responses only.
export type QuizQuestion = {
  id: string
  prompt: string
  options: string[]
  correctIndex?: number
}

export type Material = {
  id: string
  type: "file" | "link"
  title: string
  fileName: string | null
  mimeType: string | null
  sizeBytes: number | null
  // file: opens in the browser (a PDF shows in the viewer); link: the external address.
  url: string
  // file: saves it; null for links.
  downloadUrl: string | null
}

export type CourseModule = ModuleSummary & {
  courseId: string
  content: string
  materials: Material[]
  questions: QuizQuestion[]
  createdAt: string
  updatedAt: string
}
