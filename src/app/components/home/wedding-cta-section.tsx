
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";

import { getHomepageContent } from "@/services/api/homepage.api";
import type { WeddingCTASectionData } from "@/types/homepage.types";

const defaultSection: WeddingCTASectionData = {
  eyebrow: "LET’S CREATE BEAUTIFUL CHAPTERS",
  heading: "Ready to Capture Your Special Moments?",
  description:
    "Get in touch today and let us turn your moments into timeless memories.",
  backgroundImage: "/images/Golden Foreheads, Forever Love.png",
  backgroundImageAlt: "Bride and groom wedding portrait",
  storyTitle: "Your Story",
  storySubtitle: "Through Our Lens",
  showreelHref: "/portfolio",
  primaryButtonLabel: "Book a Session",
  primaryButtonHref: "/contact",
  secondaryButtonLabel: "Contact Me",
  secondaryButtonHref: "/contact",
  thumbnails: [
    {
      image: "/images/Golden Hour Indian Wedding Portrait.png",
      alt: "Wedding couple portrait",
      order: 1,
    },
    {
      image: "/images/wedding-detail.png",
      alt: "Wedding celebration",
      order: 2,
    },
    {
      image: "/images/wedding-celebration.png",
      alt: "Traditional wedding moments",
      order: 3,
    },
    {
      image: "/images/hero-wedding.png",
      alt: "Romantic wedding portrait",
      order: 4,
    },
  ],
};

export default function WeddingCTASection() {
  const [section, setSection] =
    useState<WeddingCTASectionData>(defaultSection);

  useEffect(() => {
    let isMounted = true;

    const fetchWeddingCTA = async () => {
      try {
        const response = await getHomepageContent();

        if (
          isMounted &&
          response.success &&
          response.data?.weddingCTA
        ) {
          setSection({
            ...defaultSection,
            ...response.data.weddingCTA,
          });
        }
      } catch (error) {
        console.error(
          "Failed to fetch wedding CTA section:",
          error
        );
      }
    };

    fetchWeddingCTA();

    return () => {
      isMounted = false;
    };
  }, []);

  const thumbnails = (
    section.thumbnails?.length
      ? section.thumbnails
      : defaultSection.thumbnails
  )
    .filter((image) => image.image)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="relative isolate min-h-[580px] overflow-hidden bg-[#090706] text-white lg:min-h-[640px]">

      {/* FULL BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={
            section.backgroundImage ||
            defaultSection.backgroundImage
          }
          alt={
            section.backgroundImageAlt ||
            defaultSection.backgroundImageAlt
          }
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] sm:object-[58%_center] lg:object-[65%_center]"
        />
      </div>

      {/* DARK OVERLAYS */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/80 via-40% to-transparent lg:w-2/3" />

      <div className="absolute inset-0 -z-10 bg-black/45 lg:hidden" />

      <div className="mx-auto flex min-h-[580px] max-w-[1780px] flex-col justify-between px-5 py-14 sm:px-8 sm:py-16 lg:min-h-[640px] lg:px-12 lg:py-18">

        {/* TOP RIGHT: STORY TITLE AND PLAY BUTTON */}
        <div className="flex justify-end">
          <div className="hidden items-center gap-4 lg:flex">
            <span
              style={{
                fontFamily:
                  "'Brush Script MT', 'Alex Brush', 'Dancing Script', cursive, serif",
              }}
              className="text-right text-2xl italic leading-snug tracking-wide text-white/85 sm:text-3xl"
            >
              {section.storyTitle}
              <br />
              {section.storySubtitle}
            </span>

            <Link
              href={section.showreelHref || "/portfolio"}
              aria-label="Explore wedding portfolio"
              className="flex size-11 items-center justify-center rounded-full bg-[#deb575] text-black shadow-lg transition-transform hover:scale-110"
            >
              <Play
                size={16}
                fill="currentColor"
                className="ml-0.5"
              />
            </Link>
          </div>
        </div>

        {/* CENTER / LEFT CONTENT */}
        <div className="my-auto max-w-2xl py-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#deb575] sm:text-xs">
            {section.eyebrow}
          </p>

          <h2 className="font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl xl:text-7xl">
            {section.heading}
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {section.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={section.primaryButtonHref || "/contact"}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#deb575] px-7 py-3.5 text-sm font-semibold text-black transition-all hover:bg-[#e8c387] sm:px-8 sm:py-4"
            >
              {section.primaryButtonLabel || "Book a Session"}

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href={section.secondaryButtonHref || "/contact"}
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/50 px-7 py-3.5 text-sm font-medium text-white transition-all hover:border-[#deb575] hover:bg-white/10 sm:px-8 sm:py-4"
            >
              {section.secondaryButtonLabel || "Contact Me"}

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* BOTTOM AREA: STORY BUTTON AND THUMBNAILS */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:justify-end">

          {/* MOBILE STORY TITLE AND PLAY BUTTON */}
          <div className="flex items-center gap-3 lg:hidden">
            <span
              style={{
                fontFamily:
                  "'Brush Script MT', 'Alex Brush', cursive, serif",
              }}
              className="text-xl italic tracking-wide text-white/85"
            >
              {section.storyTitle} {section.storySubtitle}
            </span>

            <Link
              href={section.showreelHref || "/portfolio"}
              aria-label="Explore wedding portfolio"
              className="flex size-9 items-center justify-center rounded-full bg-[#deb575] text-black shadow-lg"
            >
              <Play
                size={14}
                fill="currentColor"
                className="ml-0.5"
              />
            </Link>
          </div>

          {/* WEDDING THUMBNAILS */}
          <div className="grid w-full max-w-sm grid-cols-4 gap-2.5 sm:max-w-md sm:gap-3 lg:w-[380px] xl:w-[420px]">
            {thumbnails.map((image, index) => (
              <div
                key={`${image.image}-${image.order}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/25 transition-all duration-300 hover:scale-105 hover:border-[#deb575]"
              >
                <Image
                  src={image.image}
                  alt={image.alt || "Wedding photography"}
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
