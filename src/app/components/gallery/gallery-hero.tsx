
"use client";

import Image from "next/image";
import type { GalleryHero as GalleryHeroData } from "@/types/gallery.types";

interface GalleryHeroProps {
  data: GalleryHeroData;
}

export default function GalleryHero({ data }: GalleryHeroProps) {
  const headingWords = data.heading.trim().split(/\s+/);

  const firstLine = headingWords.slice(0, 1).join(" ");
  const secondLine = headingWords.slice(1, -2).join(" ");
  const highlightedText = headingWords.slice(-2).join(" ");

  const sortedButtons = [...data.buttons]
    .filter((button) => button.label)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="relative isolate flex min-h-[680px] w-full items-center overflow-hidden bg-[#080706] text-white sm:min-h-[740px] lg:min-h-[min(850px,100svh)]">

      {/* Background Image */}
      <div className="absolute inset-0 -z-30">
        <Image
          src={data.backgroundImage}
          alt={data.backgroundImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] transition-transform duration-[12000ms] ease-out hover:scale-[1.025]"
        />
      </div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 -z-20 bg-black/25" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050403] via-[#080706]/90 via-[42%] to-[#080706]/10" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#080706]/80 via-transparent to-[#080706]/30" />

      {/* Subtle Golden Glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-[#bd8c42]/[0.07] blur-[130px]" />

      {/* Hero Content */}
      <div className="mx-auto flex min-h-[680px] w-full max-w-[1600px] items-center px-6 pb-20 pt-32 sm:min-h-[740px] sm:px-10 sm:pb-24 sm:pt-36 lg:min-h-[min(850px,100svh)] lg:px-[7%] lg:pb-20 lg:pt-32">

        <div className="relative z-10 w-full max-w-[680px]">

          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-4 sm:mb-9">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8bd70] sm:w-16" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#e9c17c] sm:text-xs sm:tracking-[0.38em]">
              {data.eyebrow}
            </p>

            <span className="h-px w-8 bg-[#e8bd70]/40" />
          </div>

          {/* Main Heading */}
          <h1 className="max-w-[720px] font-serif text-[clamp(3.4rem,7.3vw,7rem)] font-normal leading-[0.92] tracking-[-0.055em] text-[#fffdf8]">

            <span className="block">
              {firstLine}
            </span>

            {secondLine && (
              <span className="mt-1 block">
                {secondLine}
              </span>
            )}

            <span className="mt-1 block font-serif italic font-normal text-[#eac17b]">
              {highlightedText}
            </span>

          </h1>

          {/* Decorative Heading Accent */}
          <div className="mt-7 flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#eac17b]" />
            <span className="h-[2px] w-2 bg-[#eac17b]/50" />
            <span className="h-[2px] w-1 bg-[#eac17b]/25" />
          </div>

          {/* Description */}
          <p className="mt-7 max-w-[490px] text-[13px] font-light leading-[1.9] tracking-[0.025em] text-white/75 sm:mt-8 sm:text-base sm:leading-[2]">
            {data.description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-6 sm:mt-11">

            {sortedButtons.map((button, index) => (
              <a
                key={`${button.label}-${index}`}
                href={button.href}
                className={
                  index === 0
                    ? "group relative inline-flex min-h-[54px] items-center justify-center gap-5 overflow-hidden rounded-full border border-[#f1cb84] bg-[#eac17b] px-8 text-[11px] font-bold uppercase tracking-[0.13em] text-[#17110a] shadow-[0_8px_35px_rgba(234,193,123,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffdda2] hover:bg-[#ffdda2] hover:shadow-[0_12px_40px_rgba(234,193,123,0.2)] sm:min-h-[58px] sm:px-9"
                    : "group inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 transition-all duration-300 hover:text-[#eac17b] sm:text-xs"
                }
              >
                {index === 0 ? (
                  <>
                    <span className="relative z-10">
                      {button.label}
                    </span>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 12h15m-6-6 6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <span className="flex h-[49px] w-[49px] shrink-0 items-center justify-center rounded-full border border-[#eac17b]/70 text-[#eac17b] transition-all duration-300 group-hover:border-[#eac17b] group-hover:bg-[#eac17b] group-hover:text-[#100d08]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-0.5 h-[17px] w-[17px]"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>

                    <span className="leading-5">
                      {button.label}
                    </span>
                  </>
                )}
              </a>
            ))}

          </div>

        </div>
      </div>

      {/* Decorative Vertical Caption */}
      <div className="pointer-events-none absolute right-[5%] top-[34%] hidden max-w-[210px] -rotate-6 text-right lg:block">

        <div className="mb-4 ml-auto h-px w-12 bg-[#eac17b]/60" />

        <p className="font-serif text-[30px] font-normal italic leading-[1.4] tracking-wide text-[#edc783]/90 xl:text-[38px]">
          {data.decorativeCaption.map((caption, index) => (
            <span key={`${caption}-${index}`} className="block">
              {caption}
            </span>
          ))}
        </p>

        <div className="mt-4 ml-auto h-px w-12 bg-[#eac17b]/60" />

      </div>

      {/* Bottom Image Accent */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#eac17b]/80 to-transparent" />

    </section>
  );
}
