
import type { Metadata } from "next";

import ServicesHero from "@/app/components/services/services-hero";
import ServicesList from "@/app/components/services/services-list";
import WhyChooseUs from "@/app/components/services/why-choose-us";
import HowItWorks from "@/app/components/services/how-it-works";
import ContactCta from "@/app/components/services/contact-cta";
import { getPageSEO } from "@/lib/seo";

import { getServicesData } from "@/services/api/services.api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

export async function generateMetadata() {
  return getPageSEO("services", {
    title: "Photography Services | Naeem Bhojani Photography",

    description:
      "Explore professional photography services by Naeem Bhojani, including wedding photography, portraits, events, and creative photography solutions tailored to capture your special moments.",

    keywords: [
      "Photography Services",
      "Naeem Bhojani Photography",
      "Professional Photography",
      "Wedding Photography",
      "Portrait Photography",
      "Event Photography",
      "Creative Photography",
      "Photography Packages",
    ],

    ogTitle: "Photography Services | Naeem Bhojani Photography",
    ogDescription:
      "Discover professional wedding, portrait, event, and creative photography services by Naeem Bhojani Photography.",

    twitterTitle: "Photography Services | Naeem Bhojani Photography",
    twitterDescription:
      "Explore professional photography services designed to capture your most memorable moments.",

    canonical: "/services",
  });
}

export default async function ServicesPage() {
  const response = await getServicesData();

  const services = response.data;

  return (
    <main className="bg-[#080706]">
      <ServicesHero data={services.hero} />

      <ServicesList data={services.services} />

      <WhyChooseUs data={services.whyChooseUs} />

      <HowItWorks data={services.howItWorks} />

      <ContactCta data={services.contactCTA} />
    </main>
  );
}
