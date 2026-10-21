
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const categories = [
  "All",
  "Weddings",
  "Pre Wedding",
  "Product Photography",
  "Birthday Parties",
  "Baby Showers",
  "Corporate Events",
  "Sports Events",
  "Head Shots",
  "Education Events",
  "Fashion & Lifestyle",
];

const photos = [
  {
    title: "Wedding Photography",
    category: "Weddings",
    image: "/images/Festive Wedding Portrait Under Floral Arch.png",
    size: "md:col-span-2",
  },
  {
    title: "Newborn Memories",
    category: "Baby Showers",
    image: "/images/philosophy-baby.png",
    size: "md:col-span-1",
  },
  {
    title: "Pre Wedding",
    category: "Pre Wedding",
    image: "/images/service-prewedding.png",
    size: "md:col-span-1",
  },
  {
    title: "Product Photography",
    category: "Product Photography",
    image: "/images/service-product.png",
    size: "md:col-span-1",
  },
  {
    title: "Sports Photography",
    category: "Sports Events",
    image: "/images/Cricket Celebration High-Five.png",
    size: "md:col-span-1",
  },
  {
    title: "Corporate Events",
    category: "Corporate Events",
    image: "/images/gallery-headshots.png",
    size: "md:col-span-1",
  },
  {
    title: "Professional Portraits",
    category: "Head Shots",
    image: "/images/gallery-corporate.png",
    size: "md:col-span-1",
  },
  {
    title: "Education Events",
    category: "Education Events",
    image: "/images/gallery-education-event.png",
    size: "md:col-span-1",
  },
  {
    title: "Birthday Celebrations",
    category: "Birthday Parties",
    image: "/images/service-birthday.png",
    size: "md:col-span-1",
  },
  {
    title: "Prize Distribution",
    category: "Education Events",
    image: "/images/gallery-prize-event.png",
    size: "md:col-span-1",
  },
  {
    title: "Fashion & Lifestyle",
    category: "Fashion & Lifestyle",
    image: "/images/gallery-fashion.png",
    size: "md:col-span-1",
  },
];

export default function GalleryCollections() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return photos;

    return photos.filter(
      (photo) => photo.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <section
      id="gallery-collections"
      className="relative overflow-hidden bg-[#080807] px-4 py-8 text-white sm:px-6 sm:py-12 lg:px-8 lg:py-14"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 -z-0 h-72 w-96 -translate-x-1/2 rounded-full bg-[#c18b38]/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px]">
        {/* Section heading */}
        <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#e6b85e]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e6b85e]">
                The Portfolio
              </p>
            </div>

            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Every Frame Tells
              <span className="ml-2 italic text-[#e9bd70]">
                a Story.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-white/55">
            A curated collection of heartfelt celebrations, beautiful
            portraits and extraordinary moments captured through our lens.
          </p>
        </div>

        {/* Category filters: vertical on mobile, wrapped on larger screens */}
        <div className="mb-6 grid grid-cols-1 gap-2 sm:mb-8 sm:grid-cols-2 md:flex md:flex-wrap">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`flex min-h-10 w-full items-center justify-between rounded-lg border px-4 py-2.5 text-left text-xs font-medium transition-all duration-300 md:w-auto md:rounded-full ${
                  isActive
                    ? "border-[#f1c56e] bg-[#f1c56e] text-[#17110a]"
                    : "border-white/15 bg-white/[0.025] text-white/75 hover:border-[#e6b85e]/70 hover:text-[#f1c56e]"
                }`}
              >
                <span>{category}</span>

                {isActive && (
                  <span className="ml-3" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <article
              key={photo.title}
              className={`group relative isolate h-[260px] min-w-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#171512] sm:h-[280px] lg:h-[300px] ${
                activeCategory === "All" ? photo.size : ""
              }`}
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 35vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Card content */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
                <div className="min-w-0">
                  <p className="font-serif text-lg leading-tight text-white sm:text-xl">
                    {photo.title}
                  </p>

                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-white/65 sm:text-xs">
                    {photo.category}
                  </p>
                </div>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e6b85e]/80 text-[#f1c56e] transition-all duration-300 group-hover:bg-[#f1c56e] group-hover:text-black">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 17 17 7M8 7h9v9"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-white/45">
            Capturing moments. Preserving memories. Telling stories.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-3 self-start text-xs font-semibold uppercase tracking-[0.15em] text-[#e9bd70] transition hover:text-white"
          >
            Plan Your Photoshoot
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
