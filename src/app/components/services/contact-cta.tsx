
"use client";

import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Professional",
    subtitle: "Photography",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6">
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
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6">
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
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6">
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
    <section className="relative isolate w-full overflow-hidden bg-[#080706] text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/contact-cta-bg.png"
          alt="A collection of wedding and portrait photography prints"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark overlays */}
      <div className="absolute inset-0 -z-10 bg-black/60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/65 to-black/75" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-transparent to-black/40" />

      <div className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-24">
        {/* Main content */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6">
            <span className="h-px w-7 bg-[#d5a650] sm:w-9" />
            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#e8c27b] sm:text-xs sm:tracking-[0.3em]">
              Let&apos;s Create Together
            </span>
            <span className="h-px w-7 bg-[#d5a650] sm:w-9" />
          </div>

          <h2 className="font-serif text-[clamp(2rem,6vw,4.75rem)] leading-[1.1] tracking-[-0.035em]">
            Let&apos;s Create Something
            <br />
            <span className="mt-1 inline-block italic text-[#e8bd70] sm:mt-2">
              Beautiful Together
            </span>
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-3 sm:mt-7">
            <span className="h-px w-8 bg-[#c49a4b]/70 sm:w-12" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#dcb366]" />
            <span className="h-px w-8 bg-[#c49a4b]/70 sm:w-12" />
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-6 text-white/80 sm:mt-6 sm:text-base sm:leading-8">
            Ready to capture your special moments? Get in touch with us today
            and let&apos;s discuss your photography needs.
          </p>

          <Link
            href="/contact"
            className="group mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#f3ca7d] bg-gradient-to-r from-[#e8b965] to-[#f4ce87] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#17100a] shadow-[0_8px_35px_rgba(216,166,80,0.15)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(216,166,80,0.3)] sm:mt-8 sm:min-h-[54px] sm:gap-4 sm:px-10 sm:text-sm"
          >
            Contact Us
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
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

        {/* Responsive feature strip */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 border-t border-white/15 pt-5 sm:mt-14 sm:grid-cols-3 sm:pt-7 lg:mt-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex min-w-0 items-center justify-start gap-4 px-4 py-4 sm:justify-center sm:px-3 sm:py-3 lg:gap-4 lg:px-5 ${
                index > 0
                  ? "border-t border-white/10 sm:border-l sm:border-t-0 sm:border-white/20"
                  : ""
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d2a452]/70 bg-black/20 text-[#e9bd6a] sm:h-12 sm:w-12">
                {feature.icon}
              </span>

              <div className="min-w-0">
                <p className="font-serif text-base leading-snug text-white sm:text-lg">
                  {feature.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-white/65 sm:text-sm">
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
