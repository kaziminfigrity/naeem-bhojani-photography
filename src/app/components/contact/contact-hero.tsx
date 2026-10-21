
"use client";

import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#080706] text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/contact-hero.png"
          alt="Bride and groom in a beautiful wedding setting"
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

      {/* Hero content — existing header is not included */}
      <div className="mx-auto flex min-h-[540px] w-full max-w-[1600px] items-center px-6 pb-12 pt-36 sm:min-h-[580px] sm:px-10 sm:pb-14 sm:pt-40 lg:min-h-[610px] lg:px-[8.2%] lg:pb-16 lg:pt-44">
        <div className="max-w-[680px]">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-9 bg-[#e8b84f]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#edbd58] sm:text-xs">
              Get in Touch
            </p>

            <span className="h-px w-9 bg-[#e8b84f]/70" />
          </div>

          {/* Main heading */}
          <h1 className="font-serif text-[clamp(2.8rem,5.2vw,5.2rem)] leading-[1.03] tracking-[-0.04em] text-[#fffdf9]">
            Let’s Create
            <br />
            Something{" "}
            <span className="italic text-[#edbd58]">
              Beautiful
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[560px] text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            We’d love to hear from you. Whether it’s a wedding, a special
            event, a portrait session, or a creative project — let’s bring
            your vision to life together.
          </p>

          {/* Decorative detail */}
          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-12 bg-[#e8b84f]" />

            <span className="h-1.5 w-1.5 rotate-45 border border-[#e8b84f]" />

            <span className="h-px w-12 bg-[#e8b84f]/40" />
          </div>

          <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-white/50">
            Every moment deserves to be remembered
          </p>
        </div>
      </div>

      {/* Subtle gold bottom border */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e8c878]/60 to-transparent" />
    </section>
  );
}
