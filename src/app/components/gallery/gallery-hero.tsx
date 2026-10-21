
"use client";

import Image from "next/image";

export default function GalleryHero() {
  return (
    <section className="relative isolate flex min-h-[680px] w-full items-center overflow-hidden bg-[#080706] text-white sm:min-h-[740px] lg:min-h-[min(850px,100svh)]">
      {/* Cinematic background image — no header included */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/images/Golden Wedding Photo Memories.png"
          alt="Professional camera and printed photography memories"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 -z-20 bg-black/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/75 via-40% to-black/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-transparent to-black/25" />

      {/* Hero content */}
      <div className="mx-auto flex min-h-[680px] w-full max-w-[1600px] items-center px-6 pb-12 pt-32 sm:min-h-[740px] sm:px-10 sm:pt-36 lg:min-h-[min(850px,100svh)] lg:px-[6.8%] lg:pb-16 lg:pt-32">
        <div className="w-full max-w-[600px]">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#edbd62]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f1c66f] sm:text-xs">
              Our Gallery
            </p>
          </div>

          {/* Main heading */}
          <h1 className="font-serif text-[clamp(3.5rem,7.2vw,6.5rem)] leading-[0.91] tracking-[-0.045em] text-[#fffdf9]">
            Stories
            <br />
            Through
            <br />
            <span className="italic text-[#f2c16b]">Our Lens</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[490px] text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            A collection of real moments, genuine emotions, and unforgettable
            stories. Explore our work and experience the beauty through our lens.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5">
            <a
              href="#gallery-collections"
              className="group inline-flex min-h-[52px] items-center justify-center gap-4 rounded-full bg-[#f5c66f] px-7 text-sm font-semibold text-[#17110a] transition-all duration-300 hover:bg-[#ffda91]"
            >
              Explore Gallery
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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

            <a
              href="#gallery-collections"
              className="group inline-flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-[#f5c66f]"
            >
              <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#e7b95f] text-[#f5c66f] transition-all duration-300 group-hover:bg-[#f5c66f] group-hover:text-black">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-1 h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>

              <span className="leading-5">
                Watch
                <br />
                Gallery Reel
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative vertical caption */}
      <div className="pointer-events-none absolute right-[4%] top-[36%] hidden max-w-[180px] -rotate-6 text-right lg:block">
        <p className="font-serif text-3xl italic leading-[1.35] text-[#edbd62] xl:text-4xl">
          Moments
          <br />
          Emotions
          <br />
          People
          <br />
          Stories
        </p>
      </div>

      {/* Bottom gold accent */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e9b744]/70 to-transparent" />
    </section>
  );
}
