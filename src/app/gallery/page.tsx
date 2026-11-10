
import type { Metadata } from "next";

import GalleryHero from "@/app/components/gallery/gallery-hero";
import GalleryCollections from "@/app/components/gallery/gallery-collections";
import FinalCTA from "@/app/components/gallery/final-cta";
import SectionDivider from "@/app/components/about/section-divider";
import GallerySignatureFeature from "@/app/components/gallery/gallery-signature-feature";

import { getGalleryData } from "@/services/api/gallery.api";
import { getPageSEO } from "@/lib/seo";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

export async function generateMetadata() {
  return getPageSEO("gallery", {
    title: "Photography Portfolio & Gallery | Naeem Bhojani Photography",

    description:
      "Explore the photography portfolio of Naeem Bhojani, featuring beautiful wedding photography, portraits, events, and creative visual stories captured with passion and attention to detail.",

    keywords: [
      "Naeem Bhojani Photography Gallery",
      "Photography Portfolio",
      "Wedding Photography Gallery",
      "Professional Photography",
      "Portrait Photography",
      "Event Photography",
      "Creative Photography",
      "Photography Collection",
      "Photographer Portfolio",
    ],

    ogTitle: "Photography Portfolio & Gallery | Naeem Bhojani Photography",
    ogDescription:
      "Discover memorable moments and creative visual stories in the photography portfolio of Naeem Bhojani.",

    twitterTitle: "Photography Portfolio & Gallery | Naeem Bhojani Photography",
    twitterDescription:
      "Explore wedding, portrait, event, and creative photography collections by Naeem Bhojani.",

    canonical: "/gallery",
  });
}

export default async function GalleryPage() {
  const response = await getGalleryData();
  const gallery = response.data;

  return (
    <main className="bg-black">
      <GalleryHero data={gallery.hero} />

      <SectionDivider />

      <GalleryCollections data={gallery.collections} />

      {gallery.signatureFeature?.isActive && (
        <GallerySignatureFeature
          data={gallery.signatureFeature}
        />
      )}

      <SectionDivider />

      <FinalCTA data={gallery.finalCTA} />
    </main>
  );
}
