
"use client";

import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Professional",
    subtitle: "Photography",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M3 8h4l2-3h6l2 3h4v11H3V8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Memorable",
    subtitle: "Experiences",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <path
          d="M20.8 8.8c0 4.3-8.8 10-8.8 10S3.2 13.1 3.2 8.8a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Personalized",
    subtitle: "Support",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
        <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M2.5 19v-1.5A5.5 5.5 0 0 1 8 12h2a5.5 5.5 0 0 1 5.5 5.5V19h-13ZM15 13h1.5a5 5 0 0 1 5 5v1H18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ContactCta() {
  return (
    <section className="relative isolate overflow-hidden bg-[#080706] text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/images/contact-cta-bg.png"
          alt="A collection of wedding and portrait photography prints"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 -z-20 bg-black/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/65 to-black/70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-transparent to-black/35" />

      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        {/* Central content */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#d5a650]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#e8c27b] sm:text-xs">
              Let&apos;s Create Together
            </span>
            <span className="h-px w-9 bg-[#d5a650]" />
          </div>

          <h2 className="font-serif text-4xl leading-[1.08] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[76px]">
            Let&apos;s Create Something
            <br />
            <span className="mt-2 inline-block italic text-[#e8bd70]">
              Beautiful Together
            </span>
          </h2>

          <div className="mx-auto mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#c49a4b]/70" />
            <span className="h-2 w-2 rotate-45 border border-[#dcb366]" />
            <span className="h-px w-12 bg-[#c49a4b]/70" />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Ready to capture your special moments? Get in touch with us today
            and let&apos;s discuss your photography needs.
          </p>

          <Link
            href="/contact"
            className="group mt-8 inline-flex min-h-[54px] items-center justify-center gap-4 rounded-full border border-[#f3ca7d] bg-gradient-to-r from-[#e8b965] to-[#f4ce87] px-8 text-xs font-bold uppercase tracking-[0.13em] text-[#17100a] shadow-[0_8px_35px_rgba(216,166,80,0.15)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(216,166,80,0.3)] sm:px-10 sm:text-sm"
          >
            Contact Us
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                d="M4 12h15m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Feature strip */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 border-t border-white/15 pt-8 sm:mt-16 sm:grid-cols-3 sm:pt-9">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex items-center justify-center gap-4 py-4 sm:py-2 ${
                index !== 0 ? "sm:border-l sm:border-white/20" : ""
              }`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d2a452]/70 text-[#e9bd6a]">
                {feature.icon}
              </span>

              <div>
                <p className="font-serif text-lg leading-tight text-white">
                  {feature.title}
                </p>
                <p className="mt-1 text-sm text-white/65">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gold bottom accent */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#d7ac60]/70 to-transparent" />
    </section>
  );
}
