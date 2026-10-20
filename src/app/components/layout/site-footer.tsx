
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowUp,
  Camera,
} from "lucide-react";

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Wedding Photography",
  "Pre-Wedding Photography",
  "Birthday Photography",
  "Event Photography",
  "Family Shoot",
  "Maternity Shoot",
  "Corporate Events",
];

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    // Connect your newsletter API here.
    setMessage("Thank you! Newsletter integration is not connected yet.");
    setEmail("");
  }

  return (
    <footer className="relative overflow-hidden border-y border-[#d6b477]/15 bg-[#080807] text-white">
      {/* Decorative gold lines */}
      <div className="pointer-events-none absolute -left-16 -top-24 size-64 rounded-full border border-[#c9a365]/40" />
      <div className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full border border-[#c9a365]/40" />

      <div className="relative mx-auto max-w-[1800px] px-6 pb-7 pt-16 sm:px-10 lg:px-12 lg:pt-20">
        {/* Main footer columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr_1fr_1.15fr_1fr] lg:gap-9 xl:gap-12">
          {/* Brand */}
          <div>
        <Link href="/" className="inline-block">
        <Image
            src="/Naeem Bhojani-logo.png"
            alt="Naeem Bhojani Photography"
            width={340}
            height={150}
            priority
            className="h-auto w-[280px] object-contain sm:w-[320px]"
        />
        </Link>
        <p className="mt-8 text-sm leading-7 text-[#e8c782]">
              CAPTURING TIMELESS STORIES, ONE FRAME
              <span className="block text-white/80">
                AT A TIME. LET&apos;S MAKE YOUR MOMENTS FOREVER.
              </span>
            </p>

            <div className="mt-8 flex items-center gap-5">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-white transition hover:text-[#edc780]"
              >
                <InstagramIcon size={25} />
              </a>

              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-white transition hover:text-[#edc780]"
              >
                <FacebookIcon size={25} />
              </a>

              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="text-white transition hover:text-[#edc780]"
              >
                <YoutubeIcon size={27} />
              </a>

              <a
                href="https://whatsapp.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="text-white transition hover:text-[#edc780]"
              >
                <Phone size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#edc780] sm:text-2xl">
              Quick Links
            </h3>

            <div className="mb-5 mt-4 h-[3px] w-9 bg-[#edc780]" />

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition hover:translate-x-1 hover:text-[#edc780] sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#edc780] sm:text-2xl">
              Our Services
            </h3>

            <div className="mb-5 mt-4 h-[3px] w-9 bg-[#edc780]" />

            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-white/80 transition hover:text-[#edc780] sm:text-base"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#edc780] sm:text-2xl">
              Contact Info
            </h3>

            <div className="mb-5 mt-4 h-[3px] w-9 bg-[#edc780]" />

            <div className="space-y-6">
              <a
                href="tel:+919876543210"
                className="flex items-start gap-4 text-sm text-white/85 transition hover:text-[#edc780] sm:text-base"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#c9a365] text-[#edc780]">
                  <Phone size={18} />
                </span>
                <span className="pt-2">+91 98765 43210</span>
              </a>

              <a
                href="mailto:info@naeembhojani.com"
                className="flex items-start gap-4 text-sm text-white/85 transition hover:text-[#edc780] sm:text-base"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#c9a365] text-[#edc780]">
                  <Mail size={18} />
                </span>
                <span className="break-all pt-2">
                  info@naeembhojani.com
                </span>
              </a>

              <div className="flex items-start gap-4 text-sm leading-7 text-white/85 sm:text-base">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#c9a365] text-[#edc780]">
                  <MapPin size={18} />
                </span>

                <p className="pt-1">
                  A/102, Sunrise Complex,
                  <br />
                  Sindhu Bhavan Road,
                  <br />
                  Ahmedabad, Gujarat - 380054
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#edc780] sm:text-2xl">
              Newsletter
            </h3>

            <div className="mb-5 mt-4 h-[3px] w-9 bg-[#edc780]" />

            <p className="text-sm leading-7 text-white/80 sm:text-base">
              Subscribe to get the latest updates, offers and photography tips.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6">
              <div className="flex overflow-hidden rounded-xl border border-[#c9a365]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Your email address"
                  className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-white/50 focus:bg-white/[0.04]"
                />

                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="flex w-14 shrink-0 items-center justify-center bg-[#f1cf91] text-black transition hover:bg-[#ffe0a7]"
                >
                  <ArrowRight size={23} />
                </button>
              </div>

              {message && (
                <p
                  aria-live="polite"
                  className="mt-3 text-xs leading-5 text-[#edc780]"
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-[#b89a63]/60 pt-6 lg:mt-16">
          <div className="flex flex-col gap-5 pr-14 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-white/75 sm:text-sm">
              © {new Date().getFullYear()} Naeem Bhojani Photography. All
              Rights Reserved.
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/75 sm:text-sm">
              <Link
                href="/privacy-policy"
                className="transition hover:text-[#edc780]"
              >
                Privacy Policy
              </Link>

              <span className="text-white/30">|</span>

              <Link
                href="/terms"
                className="transition hover:text-[#edc780]"
              >
                Terms & Conditions
              </Link>

              <span className="text-white/30">|</span>

              <Link
                href="/sitemap"
                className="transition hover:text-[#edc780]"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>

        {/* Back to top */}
        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          aria-label="Back to top"
          className="absolute bottom-5 right-5 flex size-12 items-center justify-center rounded-full bg-[#f1cf91] text-black shadow-lg transition hover:-translate-y-1 hover:bg-[#ffe0a7] sm:bottom-5 sm:right-8 sm:size-14 lg:right-12"
        >
          <ArrowUp size={25} />
        </button>
      </div>
    </footer>
  );
}
