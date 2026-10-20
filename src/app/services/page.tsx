import ServicesHero from "@/app/components/services/services-hero";
import ServicesList from "@/app/components/services/services-list";
import WhyChooseUs from "@/app/components/services/why-choose-us";
import HowItWorks from "@/app/components/services/how-it-works";
import ContactCta from "@/app/components/services/contact-cta";

export default function ServicesPage() {
  return (
    <main className="bg-[#080706]">
      <ServicesHero />
      <ServicesList/>
      <WhyChooseUs/>
      <HowItWorks/>
      <ContactCta/>
    </main>
  );
}