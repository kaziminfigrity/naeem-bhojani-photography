
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
    layout: "row-span-2",
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
    <section className="relative overflow-hidden bg-[#090909] py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_2fr] lg:gap-12">
          {/* Left Content */}
          <div className="relative flex flex-col items-start lg:pt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e5bd78]">
              Featured Gallery
            </p>

            <h2 className="mt-8 font-serif text-5xl font-normal leading-[1.08] tracking-tight sm:text-6xl xl:text-7xl">
              Real People,
              <br />
              Real Stories
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/65 sm:text-base">
              A glimpse of our recent work across different events and
              occasions.
            </p>

            <Link
              href="/portfolio"
              className="mt-8 inline-flex items-center gap-5 rounded-full bg-[#f0c77f] px-7 py-4 text-sm font-semibold text-black transition hover:bg-[#ffdaa0] sm:px-9"
            >
              View Full Gallery
              <ArrowRight size={19} />
            </Link>

            <div className="pointer-events-none absolute -bottom-12 -left-8 -z-0 hidden h-56 w-full opacity-10 lg:block">
              <Image
                src="/images/Luxurious Textured Wall Panel Display.png"
                alt=""
                fill
                sizes="350px"
                className="object-cover object-center grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />
            </div>
          </div>

          {/* Right Gallery */}
          <div className="min-w-0">
            {/* Category Filters */}
            <div className="mb-5 flex flex-wrap gap-2 rounded-2xl bg-white/[0.06] p-1.5 lg:rounded-full">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-xs transition sm:px-5 ${
                    activeCategory === category
                      ? "bg-[#f0c77f] font-semibold text-black"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="grid auto-rows-[120px] grid-cols-2 gap-2.5 sm:auto-rows-[145px] sm:grid-cols-3 lg:auto-rows-[145px] lg:grid-cols-4 xl:auto-rows-[175px]">
              {filteredItems.map((item) => (
                <Link
                  key={item.title}
                  href="/portfolio"
                  className={`group relative overflow-hidden rounded-lg bg-neutral-900 ${
                    activeCategory === "All" ? item.layout : ""
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 20vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />

                  <span className="absolute inset-x-3 bottom-3 translate-y-2 text-xs font-medium opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.title}
                  </span>
                </Link>
              ))}

              <Link
                href="/portfolio"
                className="group flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-lg border border-white/40 bg-white/[0.02] transition hover:border-[#f0c77f] hover:bg-white/[0.05] sm:min-h-[145px]"
              >
                <Plus
                  size={25}
                  strokeWidth={1.4}
                  className="transition group-hover:rotate-90"
                />
                <span className="text-sm">View More</span>
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
