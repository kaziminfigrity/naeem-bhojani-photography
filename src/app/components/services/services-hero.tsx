
"use client";

import Image from "next/image";

const stats = [
  {
    value: "10+",
    label: "Years of Experience",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M24 5 31 9 36 16 39 24 35 34 28 40 19 41 11 36 7 27 10 17 16 9 24 5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="24" cy="18" r="5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M14 35c1-7 5-10 10-10s9 3 10 10M17 9l-2 9m16-9 2 9M7 22l8 3m26-3-8 3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    value: "500+",
    label: "Events Covered",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M7 15h9l4-5h9l4 5h8a3 3 0 0 1 3 3v19a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V18a3 3 0 0 1 3-3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="26" r="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="26" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    value: "100%",
    label: "Client Satisfaction",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="m24 4 5 5 7-1 2 7 6 4-3 7 2 7-7 3-4 7-8-3-7 2-3-7-7-4 3-7-1-7 7-3 4-7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m24 14 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2 1.2-6.8-5-4.9 6.9-1L24 14Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: "4.9",
    label: "Average Rating",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="m24 4 6.2 13 14.3 2.1-10.3 10 2.4 14.2L24 36.6 11.4 43.3l2.4-14.2-10.3-10L17.8 17 24 4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function ServicesHero() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-[#080706] text-white sm:min-h-[800px] lg:min-h-[min(850px,100svh)]">
      {/* Full-width cinematic background */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/images/services-hero.png"
          alt="Professional camera equipment and wedding photography prints"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </div>

      {/* Keep text readable without hiding the photograph */}
      <div className="absolute inset-0 -z-20 bg-black/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/90 via-35% to-black/5" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-black/35" />

      {/* Hero content — header is intentionally not included */}
      <div className="mx-auto flex min-h-[760px] w-full max-w-[1600px] flex-col justify-end px-6 pb-9 pt-32 sm:min-h-[800px] sm:px-10 sm:pb-12 lg:min-h-[min(850px,100svh)] lg:px-[6.2%] lg:pb-12 lg:pt-36">
        <div className="grid flex-1 grid-cols-1 items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="max-w-[680px] py-10 lg:py-0">
            {/* Section label */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#e7b94f]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#efc45f] sm:text-xs">
                Our Services
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-[clamp(3.1rem,5.2vw,5.8rem)] leading-[0.94] tracking-[-0.045em] text-[#fffdf9]">
              Professional
              <br />
              Photography
              <br />
              Services
            </h1>

            <p className="mt-4 max-w-[660px] font-serif text-[clamp(1.65rem,3.2vw,3.25rem)] italic leading-[1.08] tracking-[-0.025em] text-[#efbd62]">
              For Every Special Moment
            </p>

            <p className="mt-5 max-w-[510px] text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
              We capture real emotions, vibrant stories and timeless memories
              with creativity and perfection.
            </p>

            {/* CTA buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#all-services"
                className="group inline-flex min-h-[50px] items-center justify-center gap-4 rounded-full bg-[#f4c36b] px-7 text-sm font-semibold text-[#15100a] transition duration-300 hover:bg-[#ffda91]"
              >
                Explore Services
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12h15m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href="/gallery"
                className="group inline-flex items-center gap-3 text-sm font-medium text-white/90 transition hover:text-[#f4c36b]"
              >
                <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#d9aa47] text-[#f4c36b] transition group-hover:bg-[#f4c36b] group-hover:text-black">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-0.5 h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>Watch Showreel</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/60 text-lg leading-none transition group-hover:border-[#f4c36b]">
                  +
                </span>
              </a>
            </div>
          </div>

          {/* Keep the image area open, just like the reference */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        {/* Bottom statistics */}
        <div className="grid grid-cols-2 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-4 sm:gap-y-0 sm:pt-7">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex items-center gap-3 sm:gap-4 sm:px-5 lg:px-6 ${
                index === 0 ? "sm:pl-0" : "sm:border-l sm:border-white/20"
              }`}
            >
              <span className="shrink-0 text-[#e9b744]">{stat.icon}</span>
              <div className="min-w-0">
                <p className="flex items-center gap-1 font-sans text-xl font-bold leading-tight text-white sm:text-2xl">
                  {stat.value}
                  {index === 3 && (
                    <span className="text-sm text-[#e9b744]">★</span>
                  )}
                </p>
                <p className="mt-1 text-[10px] leading-4 text-white/75 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle bottom edge */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e9b744]/60 to-transparent" />
    </section>
  );
}
