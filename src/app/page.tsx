import HeroBanner from "@/app/components/home/hero-banner";
import ServicesSection from "@/app/components/home/services-section";
import FeaturedGallery from "@/app/components/home/featured-gallery";
import AboutSection from "@/app/components/home/about-section";
import BehindTheLens from "@/app/components/home/behind-the-lens";
import TestimonialsSection from "@/app/components/home/testimonials-section";
import WeddingCTASection from "@/app/components/home/wedding-cta-section";

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
