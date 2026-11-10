
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  Camera,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import { getWebsiteSettings } from "@/services/api/settings.api";
import type { WebsiteSettings } from "@/types/settings.types";
import type { FooterSettings } from "@/types/footer.types";

const defaultFooter: FooterSettings = {
  description:
    "Preserving the emotions, the little details and the unforgettable moments that make your story uniquely yours.",
  tagline: "Capturing timeless stories, one frame at a time.",

  ctaEyebrow: "Your story deserves to be captured",
  ctaHeading: "Let's create something timeless.",

  exploreTitle: "Explore",
  quickLinks: [
    { label: "Home", href: "/", order: 1, isActive: true },
    { label: "About Us", href: "/about", order: 2, isActive: true },
    { label: "Our Services", href: "/services", order: 3, isActive: true },
    { label: "Gallery", href: "/gallery", order: 4, isActive: true },
    { label: "Testimonials", href: "/testimonials", order: 5, isActive: true },
    { label: "Contact Us", href: "/contact", order: 6, isActive: true },
  ],

  servicesTitle: "Our Services",
  services: [
    { label: "Wedding Photography", href: "/services", order: 1, isActive: true },
    { label: "Pre-Wedding Photography", href: "/services", order: 2, isActive: true },
    { label: "Birthday Photography", href: "/services", order: 3, isActive: true },
    { label: "Family Portraits", href: "/services", order: 4, isActive: true },
    { label: "Corporate Events", href: "/services", order: 5, isActive: true },
    { label: "Product Photography", href: "/services", order: 6, isActive: true },
  ],

  contactTitle: "Get in Touch",
  phoneLabel: "Call Us",
  emailLabel: "Email Us",
  locationLabel: "Studio Location",

  privacyPolicy: {
    label: "Privacy Policy",
    href: "/privacy-policy",
    isActive: true,
  },

  terms: {
    label: "Terms & Conditions",
    href: "/terms",
    isActive: true,
  },

  copyrightText: "All rights reserved.",
};

const defaultSettings: WebsiteSettings = {
  siteName: "Naeem Bhojani Photography",
  logo: "",
  email: "",
  phone: "",
  address: "",
  socialLinks: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  navigation: [],
  headerCTA: {
    label: "Book a Session",
    href: "/contact",
    isActive: true,
  },
  favicon: "",
  seo: {
    metaTitle: "Naeem Bhojani Photography",
    metaDescription: "",
    keywords: [],
    ogImage: "",
  },
  pageSEO: {
  home: { metaTitle: "", metaDescription: "", keywords: [], ogImage: "" },
  about: { metaTitle: "", metaDescription: "", keywords: [], ogImage: "" },
  services: { metaTitle: "", metaDescription: "", keywords: [], ogImage: "" },
  contact: { metaTitle: "", metaDescription: "", keywords: [], ogImage: "" },
  gallery: { metaTitle: "", metaDescription: "", keywords: [], ogImage: "" },
  testimonials: { metaTitle: "", metaDescription: "", keywords: [], ogImage: "" },
},
};

export default function SiteFooter() {
  const [settings, setSettings] =
    useState<WebsiteSettings>(defaultSettings);

  const [footer, setFooter] =
    useState<FooterSettings>(defaultFooter);

  useEffect(() => {
    let isMounted = true;

    const fetchSettings = async () => {
      try {
        const response = await getWebsiteSettings();

        if (isMounted && response.success && response.settings) {
          setSettings(response.settings);

          if (response.settings.footer) {
            setFooter({
              ...defaultFooter,
              ...response.settings.footer,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch footer settings:", error);
      }
    };

    fetchSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const quickLinks = (
    footer.quickLinks?.length
      ? footer.quickLinks
      : defaultFooter.quickLinks
  )
    .filter((item) => item.isActive)
    .sort((a, b) => a.order - b.order);

  const services = (
    footer.services?.length
      ? footer.services
      : defaultFooter.services
  )
    .filter((item) => item.isActive)
    .sort((a, b) => a.order - b.order);

  const logoSrc = settings.logo || "/Naeem Bhojani-logo.png";

  const socialLinks = settings.socialLinks || {
    instagram: "",
    facebook: "",
    youtube: "",
  };

  return (
    <footer className="relative isolate overflow-hidden border-t border-[#d6b477]/30 bg-[#080807] text-white">

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_10%,rgba(193,143,63,0.10),transparent_35%),radial-gradient(ellipse_at_90%_80%,rgba(193,143,63,0.07),transparent_35%)]" />

      <div className="pointer-events-none absolute -left-28 top-10 -z-10 h-72 w-72 rounded-full border border-[#c9a365]/10" />
      <div className="pointer-events-none absolute -right-28 bottom-0 -z-10 h-80 w-80 rounded-full border border-[#c9a365]/10" />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-14">

        {/* Premium CTA strip */}
        <div className="flex flex-col gap-5 border-b border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d9b66d]/50 bg-[#d9b66d]/[0.07] text-[#e8c782]">
              <Camera size={22} strokeWidth={1.5} />
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#e8c782]">
                {footer.ctaEyebrow}
              </p>

              <h2 className="mt-1 font-serif text-xl text-white sm:text-2xl">
                {footer.ctaHeading}
              </h2>
            </div>
          </div>
        </div>

        {/* Main footer columns */}
        <div className="grid gap-x-10 gap-y-12 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-14 lg:py-16">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src={logoSrc}
                alt={settings.siteName || "Naeem Bhojani Photography"}
                width={320}
                height={140}
                unoptimized={logoSrc.startsWith("http")}
                className="h-auto w-[230px] object-contain sm:w-[270px]"
              />
            </Link>

            <p className="mt-5 max-w-sm text-base leading-7 text-white/65">
              {footer.description}
            </p>

            <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#e8c782]">
              {footer.tagline}
            </p>

            {/* Social links */}
            <div className="mt-7 flex flex-wrap items-center gap-3">

              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-[#e8c782] hover:bg-[#e8c782]/10 hover:text-[#e8c782]"
                >
                  <FaInstagram size={18} />
                </a>
              )}

              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-[#e8c782] hover:bg-[#e8c782]/10 hover:text-[#e8c782]"
                >
                  <FaFacebookF size={18} />
                </a>
              )}

              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-[#e8c782] hover:bg-[#e8c782]/10 hover:text-[#e8c782]"
                >
                  <FaYoutube size={19} />
                </a>
              )}

            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-xl text-[#e8c782]">
              {footer.exploreTitle}
            </h3>

            <div className="mb-6 mt-3 h-px w-10 bg-[#e8c782]/70" />

            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-base text-white/65 transition hover:text-[#e8c782]"
                  >
                    <span className="h-px w-0 bg-[#e8c782] transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-xl text-[#e8c782]">
              {footer.servicesTitle}
            </h3>

            <div className="mb-6 mt-3 h-px w-10 bg-[#e8c782]/70" />

            <ul className="space-y-3.5">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-2 text-base text-white/65 transition hover:text-[#e8c782]"
                  >
                    <span className="text-xs text-[#e8c782]/70">
                      ✦
                    </span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-xl text-[#e8c782]">
              {footer.contactTitle}
            </h3>

            <div className="mb-6 mt-3 h-px w-10 bg-[#e8c782]/70" />

            <div className="space-y-4">

              {settings.phone && (
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 transition hover:border-[#e8c782]/40 hover:bg-[#e8c782]/[0.04]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8c782]/10 text-[#e8c782]">
                    <Phone size={18} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.16em] text-white/45">
                      {footer.phoneLabel}
                    </span>

                    <span className="mt-1 block break-words text-base text-white/85 group-hover:text-[#e8c782]">
                      {settings.phone}
                    </span>
                  </span>
                </a>
              )}

              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 transition hover:border-[#e8c782]/40 hover:bg-[#e8c782]/[0.04]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8c782]/10 text-[#e8c782]">
                    <Mail size={18} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.16em] text-white/45">
                      {footer.emailLabel}
                    </span>

                    <span className="mt-1 block break-all text-base text-white/85 group-hover:text-[#e8c782]">
                      {settings.email}
                    </span>
                  </span>
                </a>
              )}

              {settings.address && (
                <div className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8c782]/10 text-[#e8c782]">
                    <MapPin size={18} />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                      {footer.locationLabel}
                    </p>

                    <p className="mt-1 text-base leading-7 text-white/80">
                      {settings.address}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm leading-6 text-white/50">
            © {new Date().getFullYear()} {settings.siteName}.
            {" "}{footer.copyrightText}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50">

            {footer.privacyPolicy.isActive && (
              <Link
                href={footer.privacyPolicy.href}
                className="transition hover:text-[#e8c782]"
              >
                {footer.privacyPolicy.label}
              </Link>
            )}

            {footer.privacyPolicy.isActive && footer.terms.isActive && (
              <span className="text-white/20">|</span>
            )}

            {footer.terms.isActive && (
              <Link
                href={footer.terms.href}
                className="transition hover:text-[#e8c782]"
              >
                {footer.terms.label}
              </Link>
            )}

          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="absolute bottom-5 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#e8c782]/60 bg-[#e8c782] text-black shadow-lg transition hover:-translate-y-1 hover:bg-[#ffe0a0] sm:bottom-6 sm:right-8 sm:h-12 sm:w-12"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
