
import type { Metadata } from "next";

import ContactHero from "@/app/components/contact/contact-hero";
import ContactDetailsForm from "@/app/components/contact/contact-details-form";
import ContactLocation from "@/app/components/contact/contact-location";
import { getPageSEO } from "@/lib/seo";
import { getContactPageData } from "@/services/api/contact-page.api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

export async function generateMetadata() {
  return getPageSEO("contact", {
    title: "Contact Us | Naeem Bhojani Photography",

    description:
      "Get in touch with Naeem Bhojani Photography for wedding photography, portrait sessions, events, and creative photography inquiries. Contact us to discuss your photography requirements.",

    keywords: [
      "Contact Naeem Bhojani",
      "Naeem Bhojani Photography",
      "Photography Contact",
      "Book a Photographer",
      "Wedding Photography Inquiry",
      "Portrait Photography Booking",
      "Professional Photographer",
      "Photography Services Contact",
    ],

    ogTitle: "Contact Us | Naeem Bhojani Photography",
    ogDescription:
      "Have a photography project in mind? Contact Naeem Bhojani Photography to discuss your requirements and capture your special moments.",

    twitterTitle: "Contact Us | Naeem Bhojani Photography",
    twitterDescription:
      "Get in touch with Naeem Bhojani Photography for bookings and photography inquiries.",

    canonical: "/contact",
  });
}

export default async function ContactPage() {
  const response = await getContactPageData();
  const contact = response.data;

  return (
    <main className="bg-[#080706]">
      <ContactHero data={contact.hero} />

      <ContactDetailsForm data={contact.contactSection} />

      <ContactLocation data={contact.locationSection} />

      {/* <FinalCTA /> */}
    </main>
  );
}
