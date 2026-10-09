import type { StaticImageData } from "next/image"

import photo1 from "@/public/images/testimonial-1.jpg"
import photo2 from "@/public/images/testimonial-2.png"
import photo3 from "@/public/images/testimonial-3.png"

// ponytail: static until the testimonials module ships (GET /api/testimonials).
export type Testimonial = {
  name: string
  course: string
  quote: string
  photo: StaticImageData
}

export const testimonials: Testimonial[] = [
  {
    name: "Merle Eric Bump",
    course: "TEFL Course",
    quote:
      "Getting certified from the TESOL TEFL Council was one of the best decisions of my life. Outstanding and superlative service, highly recommend this for others too.",
    photo: photo1,
  },
  {
    name: "Kim Hyoungmin",
    course: "TESOL Course",
    quote:
      "This course was just what I needed to upgrade myself for a well-paying job in China.",
    photo: photo2,
  },
  {
    name: "Tran Mau Tri Tam",
    course: "TESOL Course",
    quote:
      "I feel that I have learned a lot from this course. It has been especially useful to me that I had the opportunity to put into practice some of what I was learning.",
    photo: photo3,
  },
]
