"use client";

import Image from "next/image";

export default function WeddingGalleryFeature() {
  return (
    <section className="relative isolate overflow-hidden bg-[#080706] text-white">
      {/* Single complete background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/wedding-gallery-feature.png"
          alt="Wedding photography gallery with elegant framed wedding photographs"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Cinematic overlay for readable text */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080706]/95 via-[#080706]/85 to-transparent" />

      {/* Main content */}
      <div className="mx-auto flex min-h-[520px] w-full max-w-[1600px] items-center px-6 py-16 sm:min-h-[580px] sm:px-10 sm:py-20 lg:min-h-[620px] lg:px-16">
        <div className="max-w-[600px]">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e9b85e]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e9b85e] sm:text-xs">
              Wedding Album
            </p>

            <span className="h-px w-10 bg-[#e9b85e]" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-[clamp(2.8rem,5vw,5.2rem)] leading-[0.98] tracking-[-0.04em] text-[#f8f3e9]">
            A Glimpse Into
            <br />
            Our Wedding
            <br />
            <span className="italic text-[#e8b45c]">Stories</span>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-[490px] text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            A beautiful collection of real wedding moments, love, happy
            emotions, and timeless memories — captured with the finest touch
            of photography.
          </p>

          {/* CTA */}
          <a
            href="/gallery?category=weddings"
            className="group mt-8 inline-flex min-h-12 items-center gap-5 rounded-full bg-[#efbd69] px-6 py-3 text-sm font-semibold text-[#171009] transition-all duration-300 hover:bg-[#ffda95] hover:shadow-[0_0_30px_rgba(239,189,105,0.2)] sm:px-8"
          >
            View Our Wedding Gallery

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
          </a>

          {/* Supporting text */}
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-10 bg-[#e9b85e]/70" />

            <div>
              <p className="text-xs font-medium text-white/90">
                Every frame tells a story
              </p>

              <p className="mt-1 text-[10px] tracking-[0.18em] text-white/50">
                LOVE · EMOTION · MEMORIES
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}