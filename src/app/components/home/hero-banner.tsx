
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { getHomepageContent } from "@/services/api/homepage.api";
import type {
  HeroSection,
  HeroSlide,
  HeroStat,
} from "@/types/homepage.types";

const defaultSlides: HeroSlide[] = [
  {
    image: "/images/hero-wedding.png",
    alt: "Wedding couple captured by Naeem Bhojani Photography",
    order: 1,
  },
  {
    image: "/images/wedding-detail.png",
    alt: "Wedding details",
    order: 2,
  },
  {
    image: "/images/bridal-portrait.png",
    alt: "Bridal portrait",
    order: 3,
  },
  {
    image: "/images/wedding-celebration.png",
    alt: "Wedding celebration",
    order: 4,
  },
];

const defaultStats: HeroStat[] = [
  { value: "8+", label: "YEARS OF EXPERIENCE", order: 1 },
  { value: "250+", label: "WEDDINGS COVERED", order: 2 },
  { value: "1000+", label: "HAPPY CLIENTS", order: 3 },
  { value: "15+", label: "CITIES WORLDWIDE", order: 4 },
];

const defaultHero: HeroSection = {
  eyebrow: "Naeem Bhojani Photography",
  heading: "Capturing Stories Beyond Time",
  description:
    "Professional photography with a cinematic approach, preserving your most precious moments into timeless stories.",
  slides: defaultSlides,
  stats: defaultStats,
  primaryButtonLabel: "Explore Our Work",
  primaryButtonHref: "/gallery",
  secondaryButtonLabel: "Watch Showreel",
  showreelHref: "/portfolio",
};

export default function HeroBanner() {
  const [hero, setHero] = useState<HeroSection>(defaultHero);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchHero = async () => {
      try {
        const response = await getHomepageContent();

        if (isMounted && response.success && response.data?.hero) {
          setHero({
            ...defaultHero,
            ...response.data.hero,
          });
        }
      } catch (error) {
        console.error("Failed to fetch homepage hero:", error);
      }
    };

    fetchHero();

    return () => {
      isMounted = false;
    };
  }, []);

  const slides = (hero.slides?.length ? hero.slides : defaultSlides)
    .filter((slide) => slide.image)
    .sort((a, b) => a.order - b.order);

  const stats = (hero.stats?.length ? hero.stats : defaultStats)
    .filter((stat) => stat.value || stat.label)
    .sort((a, b) => a.order - b.order);

  const currentIndex = slides.length
    ? activeIndex % slides.length
    : 0;

  const prev = () =>
    setActiveIndex((index) =>
      slides.length ? (index - 1 + slides.length) % slides.length : 0
    );

  const next = () =>
    setActiveIndex((index) =>
      slides.length ? (index + 1) % slides.length : 0
    );

  const isDefaultHeading =
    hero.heading === "Capturing Stories Beyond Time";

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-neutral-950 text-white">

      {/* Background Images */}
      {slides.map((slide, i) => (
        <Image
          key={`${slide.image}-${i}`}
          src={slide.image}
          alt={slide.alt || "Photography by Naeem Bhojani"}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ${
            i === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />

      {/* Slide numbers */}
      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex xl:right-10">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`flex flex-col items-center gap-1.5 text-[11px] font-light transition-all ${
              i === currentIndex
                ? "text-white"
                : "text-white/35 hover:text-white/60"
            }`}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {i === currentIndex && (
              <span className="h-6 w-px bg-white/70" />
            )}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 items-center px-5 pb-32 pt-28 sm:px-8 sm:pb-36 sm:pt-32 lg:px-14 lg:pb-40 lg:pt-36 xl:px-16">
        <div className="max-w-[560px] lg:max-w-[600px]">

          {/* Eyebrow */}
          <p className="mb-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#d6b477] sm:mb-5 sm:text-[11px] lg:text-[12px]">
            <span className="inline-block h-px w-7 bg-[#d6b477] sm:w-8" />
            {hero.eyebrow}
          </p>

          {/* Heading */}
          <h1
            className="text-[48px] font-light leading-[1.04] tracking-tight sm:text-[62px] md:text-[76px] lg:text-[86px] xl:text-[96px]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {isDefaultHeading ? (
              <>
                Capturing
                <br />
                Stories
                <br />
                <em
                  className="font-normal"
                  style={{ color: "#d6b477", fontStyle: "italic" }}
                >
                  Beyond Time
                </em>
              </>
            ) : (
              hero.heading
            )}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-[380px] text-[12px] leading-[1.85] text-white/70 sm:mt-6 sm:max-w-[420px] sm:text-[13px] lg:max-w-[430px] lg:text-[14px] lg:leading-[1.9]">
            {hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-9 sm:gap-6">
            <Link
              href={hero.primaryButtonHref || "/gallery"}
              className="inline-flex items-center gap-3 border border-[#d6b477] bg-[#c9a84c] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-950 transition duration-300 hover:bg-[#d6b477] sm:px-7 sm:py-[14px] sm:text-[11px]"
            >
              {hero.primaryButtonLabel || "Explore Our Work"}
              <span className="text-sm sm:text-base">→</span>
            </Link>

            <Link
              href={hero.showreelHref || "/portfolio"}
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/90 transition hover:text-white sm:text-[11px]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 sm:h-11 sm:w-11">
                <svg
                  width="11"
                  height="13"
                  viewBox="0 0 12 14"
                  fill="currentColor"
                  className="ml-0.5"
                >
                  <path d="M0 0L12 7L0 14V0Z" />
                </svg>
              </span>
              {hero.secondaryButtonLabel || "Watch Showreel"}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14 xl:px-16">
        <div className="border-t border-white/20 pb-5 pt-4 sm:pb-6 sm:pt-5">

          {/* Mobile layout */}
          <div className="flex flex-col gap-4 sm:hidden">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[20px] font-light leading-none">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.16em] text-white/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile thumbnails + arrows */}
            <div className="flex items-center gap-2 self-end">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-7 w-7 items-center justify-center border border-white/25 text-white/60 transition hover:border-white/60 hover:text-white"
              >
                <ChevronLeft size={14} />
              </button>

              <div className="flex items-center gap-1">
                {slides.map((slide, i) => (
                  <button
                    key={`${slide.image}-${i}`}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show slide ${i + 1}`}
                    className={`relative h-[50px] w-[58px] shrink-0 overflow-hidden transition-all duration-300 ${
                      i === currentIndex
                        ? "ring-2 ring-[#d6b477] ring-offset-1 ring-offset-transparent"
                        : "opacity-55 hover:opacity-85"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="58px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-7 w-7 items-center justify-center border border-white/25 text-white/60 transition hover:border-white/60 hover:text-white"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Tablet & Desktop layout */}
          <div className="hidden items-center justify-between sm:flex">

            {/* Stats row */}
            <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-6 md:gap-8 lg:gap-10"
                >
                  <div>
                    <p className="text-[20px] font-light leading-none sm:text-[22px] lg:text-[26px]">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-[8px] uppercase tracking-[0.16em] text-white/55 sm:text-[9px] lg:text-[10px]">
                      {stat.label}
                    </p>
                  </div>

                  {i < stats.length - 1 && (
                    <span className="h-7 w-px bg-white/20" />
                  )}
                </div>
              ))}
            </div>

            {/* Arrows + thumbnails */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-8 w-8 items-center justify-center border border-white/25 text-white/70 transition hover:border-white/60 hover:text-white"
              >
                <ChevronLeft size={15} />
              </button>

              <div className="flex items-center gap-1.5">
                {slides.map((slide, i) => (
                  <button
                    key={`${slide.image}-${i}`}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show slide ${i + 1}`}
                    className={`relative h-[56px] w-[64px] shrink-0 overflow-hidden transition-all duration-300 md:h-[62px] md:w-[72px] lg:h-[66px] lg:w-[78px] ${
                      i === currentIndex
                        ? "ring-2 ring-[#d6b477] ring-offset-1 ring-offset-transparent"
                        : "opacity-60 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="78px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-8 w-8 items-center justify-center border border-white/25 text-white/70 transition hover:border-white/60 hover:text-white"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
