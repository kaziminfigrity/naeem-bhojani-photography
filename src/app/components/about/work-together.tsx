
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function WorkTogether() {
  return (
    <section className="relative isolate min-h-[560px] overflow-hidden bg-black text-white sm:min-h-[620px] lg:min-h-[680px]">
      {/* Background Image */}
      <Image
        src="/images/work-together-bg.png"
        alt="Photographer capturing a beautiful sunset landscape"
        fill
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      {/* Content */}
      <div className="mx-auto flex min-h-[560px] max-w-[1650px] items-center px-5 py-20 sm:min-h-[620px] sm:px-8 lg:min-h-[680px] lg:px-12 xl:px-16">
        <div className="max-w-[760px]">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#e9bb70] sm:text-xs">
              Let&apos;s Create Something Beautiful
            </p>

            <span className="h-px w-14 bg-[#e9bb70]" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-5xl leading-[1.06] sm:text-6xl lg:text-7xl xl:text-[88px]">
            Let&apos;s Work
            <br />
            <span className="text-[#efbd70]">Together</span>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-[570px] text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
            Looking for a photographer who understands your story?
            Let&apos;s create timeless memories together.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-7">
            <Link
              href="/contact"
              className="group inline-flex min-h-12 items-center gap-4 rounded-full bg-[#efbd70] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-black transition duration-300 hover:bg-white sm:px-8 sm:text-sm"
            >
              Book a Session

              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/gallery"
              className="group inline-flex items-center gap-3 text-sm text-white transition hover:text-[#efbd70] sm:text-base"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#efbd70] text-[#efbd70] transition group-hover:bg-[#efbd70] group-hover:text-black">
                <Play size={16} fill="currentColor" />
              </span>

              Watch Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Gold Accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#efbd70]/70 to-transparent" />
    </section>
  );
}
