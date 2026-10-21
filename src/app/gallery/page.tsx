import GalleryHero from "@/app/components/gallery/gallery-hero";
import GalleryCollections from "@/app/components/gallery/gallery-collections";
import FinalCTA from "@/app/components/gallery/final-cta";
import SectionDivider from "@/app/components/about/section-divider";

export default function GalleryPage() {
  return (
    <main className="bg-black">
      <GalleryHero />
      <SectionDivider />

      <GalleryCollections />
      <SectionDivider />

      <FinalCTA />
    </main>
  );
}