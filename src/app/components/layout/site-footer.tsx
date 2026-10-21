
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

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact Us", href: "/contact" },
];

const services = [
  "Wedding Photography",
  "Pre-Wedding Photography",
  "Birthday Photography",
  "Family Portraits",
  "Corporate Events",
  "Product Photography",
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
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#e8c782]">
                Your story deserves to be captured
              </p>
              <h2 className="mt-1 font-serif text-xl text-white sm:text-2xl">
                Let&apos;s create something timeless.
              </h2>
            </div>
          </div>

          {/* <Link
            href="/contact"
            className="group inline-flex min-h-11 items-center justify-center gap-3 self-start rounded-full bg-[#e8c782] px-6 py-3 text-sm font-semibold text-[#15110a] transition duration-300 hover:bg-[#ffe0a0] sm:self-auto"
          >
            Book a Session
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link> */}
        </div>

        {/* Main footer columns */}
        <div className="grid gap-x-10 gap-y-12 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-14 lg:py-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/Naeem Bhojani-logo.png"
                alt="Naeem Bhojani Photography"
                width={320}
                height={140}
                className="h-auto w-[230px] object-contain sm:w-[270px]"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Preserving the emotions, the little details and the
              unforgettable moments that make your story uniquely yours.
            </p>

            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#e8c782]">
              Capturing timeless stories, one frame at a time.
            </p>

            {/* Social links */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-[#e8c782] hover:bg-[#e8c782]/10 hover:text-[#e8c782]"
              >
                <FaInstagram size={18} />

              </a>

              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-[#e8c782] hover:bg-[#e8c782]/10 hover:text-[#e8c782]"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-[#e8c782] hover:bg-[#e8c782]/10 hover:text-[#e8c782]"
              >
                <FaYoutube size={19} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-xl text-[#e8c782]">
              Explore
            </h3>

            <div className="mb-6 mt-3 h-px w-10 bg-[#e8c782]/70" />

            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-[#e8c782]"
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
              Our Services
            </h3>

            <div className="mb-6 mt-3 h-px w-10 bg-[#e8c782]/70" />

            <ul className="space-y-3.5">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-[#e8c782]"
                  >
                    <span className="text-[10px] text-[#e8c782]/70">
                      ✦
                    </span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-xl text-[#e8c782]">
              Get in Touch
            </h3>

            <div className="mb-6 mt-3 h-px w-10 bg-[#e8c782]/70" />

            <div className="space-y-4">
              <a
                href="tel:+919876543210"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 transition hover:border-[#e8c782]/40 hover:bg-[#e8c782]/[0.04]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8c782]/10 text-[#e8c782]">
                  <Phone size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-white/45">
                    Call Us
                  </span>
                  <span className="mt-1 block break-words text-sm text-white/85 group-hover:text-[#e8c782]">
                    +91 98765 43210
                  </span>
                </span>
              </a>

              <a
                href="mailto:info@naeembhojani.com"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3 transition hover:border-[#e8c782]/40 hover:bg-[#e8c782]/[0.04]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8c782]/10 text-[#e8c782]">
                  <Mail size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-white/45">
                    Email Us
                  </span>
                  <span className="mt-1 block break-all text-sm text-white/85 group-hover:text-[#e8c782]">
                    info@naeembhojani.com
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e8c782]/10 text-[#e8c782]">
                  <MapPin size={17} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                    Studio Location
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/80">
                    Ahmedabad, Gujarat, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter panel */}
        {/* <div className="mb-10 grid gap-6 rounded-2xl border border-[#c9a365]/25 bg-gradient-to-r from-[#17130d] via-[#100e0a] to-[#17130d] p-5 sm:p-7 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10 lg:p-9">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e8c782]">
              A Note from Our Studio
            </p>
            <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
              Stories worth staying connected for.
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/60">
              Get occasional studio updates, photography inspiration
              and announcements delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full">
            <label
              htmlFor="footer-email"
              className="mb-2 block text-xs text-white/65"
            >
              Your email address
            </label>

            <div className="flex rounded-full border border-[#c9a365]/45 bg-black/30 p-1.5 transition focus-within:border-[#e8c782]">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#e8c782] px-4 py-3 text-sm font-semibold text-[#171009] transition hover:bg-[#ffe0a0] sm:px-6"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </div>

            {message && (
              <p
                aria-live="polite"
                className="mt-3 text-xs leading-5 text-[#e8c782]"
              >
                {message}
              </p>
            )}

            <p className="mt-2 text-[10px] leading-5 text-white/40">
              Newsletter signup requires backend integration to collect subscriptions.
            </p>
          </form>
        </div> */}

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-white/50 sm:text-sm">
            © {new Date().getFullYear()} Naeem Bhojani Photography.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/50 sm:text-sm">
            <Link
              href="/privacy-policy"
              className="transition hover:text-[#e8c782]"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/terms"
              className="transition hover:text-[#e8c782]"
            >
              Terms &amp; Conditions
            </Link>
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
