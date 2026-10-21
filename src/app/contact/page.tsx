import ContactHero from "@/app/components/contact/contact-hero";
import ContactDetailsForm from "@/app/components/contact/contact-details-form";
import ContactLocation from "@/app/components/contact/contact-location";
import FinalCTA from "@/app/components/contact/final-cta";

export default function ContactPage() {
  return (
    <main className="bg-[#080706]">
      <ContactHero />
      <ContactDetailsForm />
      <ContactLocation />
      {/* <FinalCTA /> */}
    </main>
  );
}
