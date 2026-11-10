
import type { Metadata } from "next";

import AboutHero from "@/app/components/about/about-hero";
import OurStory from "@/app/components/about/our-story";
import AchievementStats from "@/app/components/about/achievement-stats";
import OurPhilosophy from "@/app/components/about/our-philosophy";
import OurExpertise from "@/app/components/about/our-expertise";
import WhyChooseUs from "@/app/components/about/why-choose-us";
import WorkTogether from "@/app/components/about/work-together";
import SectionDivider from "@/app/components/about/section-divider";
import { getPageSEO } from "@/lib/seo";
import { getAboutData } from "@/services/api/about.api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

export async function generateMetadata() {
  return getPageSEO("about", {
    title: "About Us | Naeem Bhojani Photography",
    description:
      "Discover the story behind Naeem Bhojani Photography. Learn about our photography journey, creative philosophy, expertise, achievements, and passion for capturing timeless moments.",

    keywords: [
      "About Naeem Bhojani",
      "Naeem Bhojani Photography",
      "Professional Photographer",
      "Photography Studio",
      "Wedding Photography",
      "Portrait Photography",
      "Photography Journey",
      "Creative Photography",
    ],

    ogTitle: "About Us | Naeem Bhojani Photography",
    ogDescription:
      "Get to know Naeem Bhojani Photography, our journey, creative vision, photography expertise, and passion for capturing meaningful moments.",

    twitterTitle: "About Us | Naeem Bhojani Photography",
    twitterDescription:
      "Discover our photography journey, creative philosophy, and passion for timeless photography.",

    canonical: "/about",
  });
}

export default async function AboutPage() {
  const response = await getAboutData();

  const about = response.data;

  return (
    <main className="bg-black">
      <AboutHero data={about.hero} />
      <SectionDivider />

      <OurStory data={about.story} />
      <SectionDivider />

      <AchievementStats data={about.achievementStats} />
      <SectionDivider />

      <OurPhilosophy data={about.philosophy} />
      <SectionDivider />

      <OurExpertise data={about.expertise} />
      <SectionDivider />

      <WhyChooseUs data={about.whyChooseUs} />
      <SectionDivider />

      <WorkTogether data={about.workTogether} />
    </main>
  );
}
