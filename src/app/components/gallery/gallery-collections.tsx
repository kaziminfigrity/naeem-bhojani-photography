
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { GalleryCollections as GalleryCollectionsData } from "@/types/gallery.types";

interface GalleryCollectionsProps {
  data: GalleryCollectionsData;
}

export default function GalleryCollections({
  data,
}: GalleryCollectionsProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Active photos sorted by order
  const activePhotos = useMemo(() => {
    return data.photos
      .filter((photo) => photo.isActive)
      .sort((a, b) => a.order - b.order);
  }, [data.photos]);

  // Category filtering
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return activePhotos;

    return activePhotos.filter(
      (photo) => photo.category === activeCategory
    );
  }, [activeCategory, activePhotos]);

  // Show only categories that have active photos
  const availableCategories = useMemo(() => {
    const photoCategories = new Set(
      activePhotos.map((photo) => photo.category)
    );

    return [
      "All",
      ...data.categories.filter(
        (category) => photoCategories.has(category)
      ),
    ];
  }, [data.categories, activePhotos]);

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
                {data.eyebrow}
              </p>
            </div>

            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {data.heading.split(" ").slice(0, -2).join(" ")}
              <span className="ml-2 italic text-[#e9bd70]">
                {data.heading.split(" ").slice(-2).join(" ")}
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-white/55">
            {data.description}
          </p>
        </div>

        {/* Category filters */}
        <div className="mb-6 grid grid-cols-1 gap-2 sm:mb-8 sm:grid-cols-2 md:flex md:flex-wrap">
          {availableCategories.map((category) => {
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
              key={photo._id || `${photo.title}-${photo.order}`}
              className={`group relative isolate h-[260px] min-w-0 overflow-hidden rounded-xl border border-white/[0.08] bg-[#171512] sm:h-[280px] lg:h-[300px] ${
                activeCategory === "All" ? photo.size : ""
              }`}
            >
              <Image
                src={photo.image}
                alt={photo.alt || photo.title}
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

        {/* Empty state */}
        {filteredPhotos.length === 0 && (
          <div className="py-16 text-center text-sm text-white/50">
            No photos available in this category.
          </div>
        )}

        {/* Bottom note */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-white/45">
            {data.bottomNote}
          </p>

          <a
            href={data.ctaHref}
            className="inline-flex items-center gap-3 self-start text-xs font-semibold uppercase tracking-[0.15em] text-[#e9bd70] transition hover:text-white"
          >
            {data.ctaLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
