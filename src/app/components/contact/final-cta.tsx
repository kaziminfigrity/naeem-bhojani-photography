
"use client";

import Image from "next/image";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative isolate w-full overflow-hidden border-y border-[#e8c878]/35 bg-[#080706] text-white">
      {/* Complete background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/contact-final-cta.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark overlay keeps the background elegant */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      {/* Extra contrast behind the centered content */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.12)_55%,transparent_100%)]" />

      <div className="mx-auto flex min-h-[340px] max-w-[1600px] items-center justify-center px-5 py-14 sm:min-h-[390px] sm:px-8 sm:py-16 lg:min-h-[440px] lg:px-16">
        <div className="w-full max-w-[920px] text-center">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6">
            <span className="h-px w-7 bg-[#e9b84f] sm:w-10" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#efbd58] sm:text-xs sm:tracking-[0.32em]">
              Let’s Create Together
            </p>

            <span className="h-px w-7 bg-[#e9b84f] sm:w-10" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-[clamp(2.2rem,5.4vw,5rem)] leading-[1.05] tracking-[-0.035em] text-[#fffaf1]">
            Turn Your Moments
            <br />
            <span className="mt-1 inline-block italic text-[#f2bd59]">
              into Timeless Memories
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-[700px] text-sm leading-6 text-white/85 sm:mt-6 sm:text-base sm:leading-7">
            Looking to create your own beautiful story? Get in touch with us
            today and let’s plan your next photography session.
          </p>

          {/* CTA */}
          <Link
            href="/contact"
            className="group mt-7 inline-flex min-h-[50px] items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#f6c96b] to-[#efb64d] px-7 py-3 text-sm font-bold text-[#171009] shadow-[0_0_28px_rgba(239,189,89,0.18)] transition duration-300 hover:-translate-y-0.5 hover:from-[#ffda8c] hover:to-[#f4c366] hover:shadow-[0_0_38px_rgba(239,189,89,0.3)] sm:mt-8 sm:min-h-[56px] sm:px-10 sm:text-base"
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

      {/* Subtle gold borders */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#e8c878]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e8c878]/60 to-transparent" />
    </section>
  );
}
