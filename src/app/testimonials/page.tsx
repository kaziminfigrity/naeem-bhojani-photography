import TestimonialsHero from "@/app/components/testimonials/testimonials-hero";
import TestimonialReviews from "@/app/components/testimonials/testimonial-reviews";
import FinalStoryCTA from "@/app/components/testimonials/final-story-cta";
import ClientStories from "@/app/components/testimonials/client-stories";

export default function TestimonialsPage() {
  return (
    <main className="bg-black">
      <TestimonialsHero />
      <TestimonialReviews />
      <FinalStoryCTA />
      {/* <ClientStories /> */}
    </main>
  );
}