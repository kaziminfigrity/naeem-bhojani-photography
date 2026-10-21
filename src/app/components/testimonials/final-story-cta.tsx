
"use client";

import Image from "next/image";
import Link from "next/link";

export default function FinalStoryCTA() {
  return (
    <section className="relative isolate w-full overflow-hidden border-y border-[#d9b866]/40 bg-[#080706] text-white">

      {/* Main background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/final-story-cta.png"
          alt="Photography memories and a collection of beautiful moments"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 -z-10 bg-black/45" />

      {/* Soft black gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-black/45 to-black/70" />

      {/* Content */}
      <div className="mx-auto flex min-h-[400px] max-w-[1600px] items-center justify-center px-5 py-16 text-center sm:min-h-[460px] sm:px-8 sm:py-20 lg:min-h-[500px]">

        <div className="mx-auto max-w-4xl">

          {/* Camera icon */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#e9b84f]/70 bg-black/50 text-[#e9b84f] sm:h-16 sm:w-16">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7 sm:h-8 sm:w-8"
              aria-hidden="true"
            >
              <path
                d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11H3V8a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Eyebrow */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#edbd58] sm:text-xs">
            Let’s Create Together
          </p>

          {/* Heading */}
          <h2 className="mt-5 font-serif text-[clamp(2.3rem,5vw,4.7rem)] leading-[1.05] tracking-tight text-[#fffaf2]">
            Turn Your Moments
            <br />
            <span className="italic text-[#efbd58]">
              into Timeless Memories
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
            Looking to create your own beautiful story? Get in touch
            with us today and let’s plan your next photography session.
          </p>

          {/* CTA button */}
          <Link
            href="/contact"
            className="group mt-8 inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#f3bd55] to-[#ffda83] px-7 py-3 text-sm font-semibold text-[#171009] shadow-[0_0_25px_rgba(239,189,88,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(239,189,88,0.35)] sm:px-9"
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

      {/* Light gold borders */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#e8c878]/50 to-transparent" />

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e8c878]/50 to-transparent" />

    </section>
  );
}
