
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const weddingImages = [
  {
    src: "/images/Golden Hour Indian Wedding Portrait.png",
    alt: "Wedding couple portrait",
  },
  {
    src: "/images/wedding-detail.png",
    alt: "Wedding celebration",
  },
  {
    src: "/images/wedding-celebration.png",
    alt: "Traditional wedding moments",
  },
  {
    src: "/images/hero-wedding.png",
    alt: "Romantic wedding portrait",
  },
];

export default function WeddingCTASection() {
  return (
    <section className="relative isolate min-h-[580px] overflow-hidden bg-[#090706] text-white lg:min-h-[640px]">
      {/* Full background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/Golden Foreheads, Forever Love.png"
          alt="Bride and groom wedding portrait"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] sm:object-[58%_center] lg:object-[65%_center]"
        />
      </div>

      {/* Dark overlay for text readability on the left */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/80 via-40% to-transparent lg:w-2/3" />
      <div className="absolute inset-0 -z-10 bg-black/45 lg:hidden" />

      <div className="mx-auto flex min-h-[580px] max-w-[1780px] flex-col justify-between px-5 py-14 sm:px-8 sm:py-16 lg:min-h-[640px] lg:px-12 lg:py-18">
        {/* Top Right: Story title and play button */}
        <div className="flex justify-end">
          <div className="hidden items-center gap-4 lg:flex">
            <span
              style={{
                fontFamily:
                  "'Brush Script MT', 'Alex Brush', 'Dancing Script', cursive, serif",
              }}
              className="text-right text-2xl italic leading-snug tracking-wide text-white/85 sm:text-3xl"
            >
              Your Story
              <br />
              Through Our Lens
            </span>

            <Link
              href="/portfolio"
              aria-label="Explore wedding portfolio"
              className="flex size-11 items-center justify-center rounded-full bg-[#deb575] text-black shadow-lg transition-transform hover:scale-110"
            >
              <Play size={16} fill="currentColor" className="ml-0.5" />
            </Link>
          </div>
        </div>

        {/* Center / Left Content */}
        <div className="my-auto max-w-2xl py-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#deb575] sm:text-xs">
            LET’S CREATE BEAUTIFUL CHAPTERS
          </p>

          <h2 className="font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl xl:text-7xl">
            Ready to Capture
            <br />
            Your{" "}
            <span className="text-[#deb575]">Special Moments?</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Get in touch today and let us turn your moments into timeless
            memories.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#deb575] px-7 py-3.5 text-sm font-semibold text-black transition-all hover:bg-[#e8c387] sm:px-8 sm:py-4"
            >
              Book a Session
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/50 px-7 py-3.5 text-sm font-medium text-white transition-all hover:border-[#deb575] hover:bg-white/10 sm:px-8 sm:py-4"
            >
              Contact Me
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Bottom area: Thumbnails on bottom right + Mobile Story button */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:justify-end">
          {/* Mobile Story title & play button */}
          <div className="flex items-center gap-3 lg:hidden">
            <span
              style={{
                fontFamily:
                  "'Brush Script MT', 'Alex Brush', cursive, serif",
              }}
              className="text-xl italic tracking-wide text-white/85"
            >
              Your Story Through Our Lens
            </span>

            <Link
              href="/portfolio"
              aria-label="Explore wedding portfolio"
              className="flex size-9 items-center justify-center rounded-full bg-[#deb575] text-black shadow-lg"
            >
              <Play size={14} fill="currentColor" className="ml-0.5" />
            </Link>
          </div>

          {/* 4 Wedding Thumbnails */}
          <div className="grid w-full max-w-sm grid-cols-4 gap-2.5 sm:max-w-md sm:gap-3 lg:w-[380px] xl:w-[420px]">
            {weddingImages.map((image) => (
              <div
                key={image.src}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/25 transition-all duration-300 hover:border-[#deb575] hover:scale-105"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 22vw, 100px"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

