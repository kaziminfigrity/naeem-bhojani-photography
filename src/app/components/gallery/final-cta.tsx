"use client";

import Image from "next/image";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#080706] text-white">
      {/* Full background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/final-cta-bg.png"
          alt="Elegant photography setup with wedding photographs and camera"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 -z-10 bg-black/45" />

      {/* Soft central shadow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.48)_75%)]" />

      <div className="relative mx-auto flex min-h-[320px] max-w-[1600px] items-center justify-center px-5 py-14 text-center sm:min-h-[360px] sm:px-8 sm:py-16 lg:min-h-[390px] lg:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#e7bb70]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#efc779] sm:text-xs">
              Let’s Create Together
            </p>
            <span className="h-px w-7 bg-[#e7bb70]" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl leading-[1.12] tracking-tight text-[#fffaf1] sm:text-4xl md:text-5xl lg:text-6xl">
            Turn Your Moments
            <br />
            <span className="mt-1 inline-block italic text-[#efbd69]">
              into Timeless Memories
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
            Looking to create your own beautiful story? Get in touch with us
            today and let’s plan your next photography session.
          </p>

          {/* CTA button */}
          <Link
            href="/contact"
            className="group mt-7 inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#f3c875] to-[#e9ae4e] px-7 py-3 text-sm font-semibold text-[#171009] shadow-[0_5px_25px_rgba(231,181,89,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(231,181,89,0.3)] sm:px-9"
          >
            Book a Session
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
      </div>
    </section>
  );
}