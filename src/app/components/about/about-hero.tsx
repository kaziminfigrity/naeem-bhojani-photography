
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

const photographyTypes = [
  "Weddings",
  "Portraits",
  "Events",
  "Products",
  "Corporate",
  "And More...",
];

export default function AboutHero() {
  return (
    <section className="relative isolate min-h-[650px] overflow-hidden bg-[#080706] text-white lg:min-h-[760px]">
      {/* Background Photographer Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/Golden-Lit Event Photographer at Work.png"
          alt="Photographer capturing beautiful moments"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] lg:object-center"
        />
      </div>

      {/* Dark Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/90 to-transparent" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-transparent to-black/10" />

      <div className="mx-auto flex min-h-[650px] max-w-[1600px] flex-col justify-center px-5 pb-24 pt-28 sm:px-8 lg:min-h-[760px] lg:px-16">
        <div className="max-w-[680px]">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-sm"
          >
            <Link
              href="/"
              className="text-white/75 transition-colors hover:text-[#e9bb72]"
            >
              Home
            </Link>

            <ChevronRight size={16} className="text-white/50" />

            <span className="text-[#e9bb72]">About Us</span>
          </nav>

          {/* Eyebrow */}
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-[#e9bb72] sm:text-sm">
            About Naeem Bhojani Photography
          </p>

          {/* Heading */}
          <h1 className="font-serif text-5xl leading-[1.04] tracking-tight sm:text-6xl lg:text-[76px]">
            Capturing
            <br />
            Life’s{" "}
            <span className="text-[#f0c47f]">Beautiful</span>
            <br />
            <span className="font-light italic text-[#f0c47f]">
              Stories
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-[610px] text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            At Naeem Bhojani Photography, we believe every moment has a story
            — a feeling, a connection, and a meaning. We capture those moments
            with creativity, passion and an eye for detail, turning them into
            timeless memories.
          </p>

          {/* CTA */}
          <Link
            href="#our-story"
            className="group mt-7 inline-flex min-h-14 items-center gap-5 rounded-full bg-[#f2c57f] px-8 text-sm font-semibold text-[#17100a] transition-all duration-300 hover:bg-white"
          >
            Our Journey
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Photography Categories */}
        <div className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-white/15 pt-5 text-xs sm:gap-x-6 sm:text-sm lg:absolute lg:bottom-8 lg:right-16 lg:mt-0 lg:border-0 lg:pt-0">
          {photographyTypes.map((type, index) => (
            <div key={type} className="flex items-center gap-x-4 sm:gap-x-6">
              <span
                className={
                  index === 0
                    ? "text-[#f2c57f]"
                    : "text-white/90 transition-colors hover:text-[#f2c57f]"
                }
              >
                {type}
              </span>

              {index !== photographyTypes.length - 1 && (
                <span className="text-white/40">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
