
import AboutHero from "@/app/components/about/about-hero";
import OurStory from "@/app/components/about/our-story";
import AchievementStats from "@/app/components/about/achievement-stats";
import OurPhilosophy from "@/app/components/about/our-philosophy";
import OurExpertise from "@/app/components/about/our-expertise";
import WhyChooseUs from "@/app/components/about/why-choose-us";
import WorkTogether from "@/app/components/about/work-together";
import SectionDivider from "@/app/components/about/section-divider";

export default function AboutPage() {
  return (
    <main className="bg-black">
      <AboutHero />
      <SectionDivider />

      <OurStory />
      <SectionDivider />

      <AchievementStats />
      <SectionDivider />

      <OurPhilosophy />
      <SectionDivider />

      <OurExpertise />
      <SectionDivider />

      <WhyChooseUs />
      <SectionDivider />

      <WorkTogether />
    </main>
  );
}
