
import type { Metadata } from "next";

import TestimonialsHero from "@/app/components/testimonials/testimonials-hero";
import TestimonialReviews from "@/app/components/testimonials/testimonial-reviews";
import FinalStoryCTA from "@/app/components/testimonials/final-story-cta";

import { getTestimonialsData } from "@/services/api/testimonials.api";
import { getPageSEO } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

export async function generateMetadata() {
  return getPageSEO("testimonials", {
    title: "Client Testimonials | Naeem Bhojani Photography",

    description:
      "Read reviews and testimonials from clients of Naeem Bhojani Photography. Discover their experiences, feedback, and stories about our photography services and memorable moments.",

    keywords: [
      "Naeem Bhojani Photography Reviews",
      "Photography Testimonials",
      "Client Reviews",
      "Wedding Photography Reviews",
      "Professional Photographer Reviews",
      "Photography Client Feedback",
      "Photography Experience",
      "Naeem Bhojani Reviews",
    ],

    ogTitle: "Client Testimonials | Naeem Bhojani Photography",
    ogDescription:
      "Discover what clients say about their experience with Naeem Bhojani Photography through genuine reviews and memorable stories.",

    twitterTitle: "Client Testimonials | Naeem Bhojani Photography",
    twitterDescription:
      "Read client reviews and discover the experiences behind Naeem Bhojani Photography.",

    canonical: "/testimonials",
  });
}
export default async function TestimonialsPage() {
  const response = await getTestimonialsData();
  const testimonials = response.data;

  return (
    <main className="bg-black">
      <TestimonialsHero data={testimonials.hero} />

      <TestimonialReviews data={testimonials.reviewsSection} />

      <FinalStoryCTA data={testimonials.finalCTA} />
    </main>
  );
}
