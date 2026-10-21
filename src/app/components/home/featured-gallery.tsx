
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";

const categories = [
  "All",
  "Wedding",
  "Birthday Parties",
  "Headshots",
  "Sports",
  "Corporate Events",
];

const galleryItems = [
  {
    title: "Wedding Celebration",
    category: "Wedding",
    image: "/images/Festive Wedding Portrait Under Floral Arch.png",
    layout: "md:row-span-2",
  },
  {
    title: "Wedding Reception",
    category: "Wedding",
    image: "/images/Golden Hour Indian Wedding Portrait.png",
    layout: "",
  },
  {
    title: "Professional Portrait",
    category: "Headshots",
    image: "/images/Speaker Addressing a Warmly Lit Gathering.png",
    layout: "",
  },
  {
    title: "Sports Photography",
    category: "Sports",
    image: "/images/Cricket Team at SGVP International Hostel.png",
    layout: "",
  },
  {
    title: "Wedding Venue",
    category: "Wedding",
    image: "/images/Luxurious Golden-Light Still Life.png",
    layout: "",
  },
  {
    title: "Birthday Portrait",
    category: "Birthday Parties",
    image: "/images/Princess Birthday Dessert Celebration.png",
    layout: "",
  },
  {
    title: "Corporate Gathering",
    category: "Corporate Events",
    image: "/images/Business Networking at a Vibrant Trade Show.png",
    layout: "",
  },
  {
    title: "Sports Celebration",
    category: "Sports",
    image: "/images/Cricket Celebration High-Five.png",
    layout: "",
  },
  {
    title: "Corporate Portraits",
    category: "Corporate Events",
    image: "/images/Sehri Party Bouquet Presentation.png",
    layout: "",
  },
  {
    title: "Business Exhibition",
    category: "Corporate Events",
    image: "/images/Focused Note-Taking in Blue Drapes.png",
    layout: "",
  },
];

export default function FeaturedGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === activeCategory
        );

  return (
    <section className="relative overflow-hidden bg-[#090909] py-12 text-white sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.78fr_2fr] lg:gap-12 xl:gap-16">

          {/* LEFT CONTENT */}
          <div className="relative flex flex-col items-start lg:pt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e5bd78] sm:text-[11px] sm:tracking-[0.32em]">
              Featured Gallery
            </p>

            <h2 className="mt-5 font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-normal leading-[1.06] tracking-tight">
              Real People,
              <br />
              Real Stories
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/65 sm:mt-6 sm:text-base">
              A glimpse of our recent work across different events and
              occasions.
            </p>

            <Link
              href="/gallery"
              className="group mt-6 inline-flex min-h-12 items-center gap-4 rounded-full bg-[#f0c77f] px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-[#ffdaa0] sm:mt-8 sm:px-8"
            >
              View Full Gallery
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* RIGHT GALLERY */}
          <div className="min-w-0">

            {/* Category filters: vertical on mobile, wrapped rows on larger screens */}
            <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                Explore Categories
              </p>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                    className={`flex min-h-10 w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-xs transition duration-300 lg:w-auto lg:rounded-full ${
                      activeCategory === category
                        ? "bg-[#f0c77f] font-semibold text-black"
                        : "border border-white/10 bg-white/[0.025] text-white/75 hover:border-[#f0c77f]/50 hover:text-white"
                    }`}
                  >
                    {category}

                    {activeCategory === category && (
                      <span className="ml-3 text-sm">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Responsive photo grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[145px] lg:auto-rows-[155px] xl:grid-cols-4 xl:auto-rows-[170px]">

              {filteredItems.map((item) => (
                <Link
                  key={item.title}
                  href="/gallery"
                  aria-label={`View ${item.title} in gallery`}
                  className={`group relative isolate aspect-[4/3] min-w-0 overflow-hidden rounded-lg bg-neutral-900 md:aspect-auto ${
                    activeCategory === "All" ? item.layout : ""
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="absolute inset-x-3 bottom-3 text-xs font-medium leading-5 text-white sm:text-sm">
                    {item.title}
                  </span>
                </Link>
              ))}

              {/* View more card */}
              <Link
                href="/gallery"
                className="group flex min-h-32 flex-col items-center justify-center gap-3 rounded-lg border border-white/25 bg-white/[0.025] p-4 text-center transition duration-300 hover:border-[#f0c77f] hover:bg-[#f0c77f]/[0.06] md:min-h-0"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition duration-300 group-hover:border-[#f0c77f] group-hover:text-[#f0c77f]">
                  <Plus
                    size={22}
                    strokeWidth={1.4}
                    className="transition-transform duration-300 group-hover:rotate-90"
                  />
                </span>

                <span className="text-sm font-medium">View More</span>

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
