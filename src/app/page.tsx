
import type { Metadata } from "next";

import HeroBanner from "@/app/components/home/hero-banner";
import ServicesSection from "@/app/components/home/services-section";
import FeaturedGallery from "@/app/components/home/featured-gallery";
import AboutSection from "@/app/components/home/about-section";
import BehindTheLens from "@/app/components/home/behind-the-lens";
import TestimonialsSection from "@/app/components/home/testimonials-section";
import WeddingCTASection from "@/app/components/home/wedding-cta-section";


import { getPageSEO } from "@/lib/seo";
export async function generateMetadata() {
  return getPageSEO("home", {
    title: "Professional Photographer in India | Naeem Bhojani",

    description:
      "Explore the photography portfolio of Naeem Bhojani. Discover beautiful wedding photography, portraits, events, and timeless moments captured with creativity and passion.",

    keywords: [
      "Naeem Bhojani Photography",
      "Professional Photographer",
      "Wedding Photographer",
      "Wedding Photography",
      "Portrait Photography",
      "Event Photography",
      "Photography Portfolio",
      "Professional Photography",
    ],

    ogTitle: "Naeem Bhojani Photography | Capturing Timeless Moments",
    ogDescription:
      "Discover beautiful wedding, portrait, and event photography by Naeem Bhojani.",

    twitterTitle: "Naeem Bhojani Photography",
    twitterDescription:
      "Discover beautiful wedding, portrait, and event photography by Naeem Bhojani.",

    canonical: "/",
  });
}
export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <ServicesSection />
      <FeaturedGallery />
      <AboutSection />
      <BehindTheLens />
      <TestimonialsSection />
      <WeddingCTASection />
    </main>
  );
}
