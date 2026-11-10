
"use client";

import Image from "next/image";

import type {
  ContactHeroData,
} from "@/types/contact-page.types";

interface ContactHeroProps {
  data: ContactHeroData;
}

export default function ContactHero({ data }: ContactHeroProps) {
  const headingWords = data.heading.trim().split(/\s+/);

  const firstLine = headingWords.slice(0, 2).join(" ");
  const remainingWords = headingWords.slice(2);
  const highlightedText = remainingWords.pop() || "";
  const secondLine = remainingWords.join(" ");

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#080706] text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={data.backgroundImage}
          alt={data.backgroundImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center]"
        />
      </div>

      {/* Dark cinematic overlays */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070706]/95 via-[#070706]/80 via-[45%] to-transparent" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

      {/* Hero content */}
      <div className="mx-auto flex min-h-[540px] w-full max-w-[1600px] items-center px-6 pb-12 pt-36 sm:min-h-[580px] sm:px-10 sm:pb-14 sm:pt-40 lg:min-h-[610px] lg:px-[8.2%] lg:pb-16 lg:pt-44">
        <div className="max-w-[680px]">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-9 bg-[#e8b84f]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#edbd58] sm:text-xs">
              {data.eyebrow}
            </p>

            <span className="h-px w-9 bg-[#e8b84f]/70" />
          </div>

          {/* Main heading */}
          <h1 className="font-serif text-[clamp(2.8rem,5.2vw,5.2rem)] leading-[1.03] tracking-[-0.04em] text-[#fffdf9]">
            {firstLine}
            <br />
            {secondLine && `${secondLine} `}
            <span className="italic text-[#edbd58]">
              {highlightedText}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[560px] text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            {data.description}
          </p>

          {/* Decorative detail */}
          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-12 bg-[#e8b84f]" />

            <span className="h-1.5 w-1.5 rotate-45 border border-[#e8b84f]" />

            <span className="h-px w-12 bg-[#e8b84f]/40" />
          </div>

          <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-white/50">
            {data.supportingText}
          </p>
        </div>
      </div>

      {/* Subtle gold bottom border */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e8c878]/60 to-transparent" />
    </section>
  );
}
