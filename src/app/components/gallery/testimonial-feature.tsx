
"use client";

import Image from "next/image";

export default function TestimonialFeature() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#080706] text-white">
      {/* Complete testimonial artwork */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/testimonial-feature.png"
          alt="Wedding photography testimonial with romantic couple and wedding photographs"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Subtle overlay for a cinematic appearance */}
      <div className="absolute inset-0 -z-10 bg-black/10" />

      {/* Content layer — no header included */}
      <div className="mx-auto flex min-h-[300px] w-full max-w-[1600px] items-center px-5 py-12 sm:min-h-[340px] sm:px-10 sm:py-14 lg:min-h-[380px] lg:px-16">
        <div className="w-full lg:w-[58%]">
          {/* Quote mark */}
          <div className="mb-2 font-serif text-5xl leading-none text-[#e5b45c] sm:text-6xl">
            “
          </div>

          {/* Testimonial */}
          <blockquote className="max-w-[720px] font-serif text-xl italic leading-relaxed text-[#fffaf1] sm:text-2xl lg:text-[clamp(1.5rem,2.2vw,2.5rem)]">
            Every photograph is a story, and every story has a moment.
            Thank you for capturing our memories to share a{" "}
            <span className="text-[#e8b45c]">lifetime.</span>
          </blockquote>

          {/* Attribution */}
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#e5b45c]" />
            <p className="font-serif text-base text-white/90 sm:text-lg">
              A Happy Client
            </p>
          </div>

          {/* Gold accent */}
          <div className="mt-7 h-px w-28 bg-gradient-to-r from-[#e5b45c]/80 to-transparent" />
        </div>
      </div>

      {/* Soft gold borders */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6ad61]/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d6ad61]/50 to-transparent" />
    </section>
  );
}
