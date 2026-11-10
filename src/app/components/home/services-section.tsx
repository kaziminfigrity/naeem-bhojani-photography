
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { getHomepageContent } from "@/services/api/homepage.api";
import type {
  ServicesSectionData,
  HomeService,
} from "@/types/homepage.types";

const defaultServices: HomeService[] = [
  {
    title: "Wedding Photography",
    image: "/images/Golden Hour Indian Wedding Portrait.png",
    alt: "Wedding photography",
    href: "/services/wedding",
    order: 1,
    isActive: true,
  },
  {
    title: "Products Photography",
    image: "/images/Luxe Bella Perfume Still Life.png",
    alt: "Product photography",
    href: "/services/products",
    order: 2,
    isActive: true,
  },
  {
    title: "Birthday Parties",
    image: "/images/Princess Birthday Dessert Celebration.png",
    alt: "Birthday photography",
    href: "/services/birthday",
    order: 3,
    isActive: true,
  },
  {
    title: "Headshots",
    image: "/images/Confident Corporate Portrait with Warm Bokeh.png",
    alt: "Professional headshots",
    href: "/services/headshots",
    order: 4,
    isActive: true,
  },
  {
    title: "Baby Shower",
    image: "/images/Joyful Baby in a Dreamy Pink Celebration.png",
    alt: "Baby shower photography",
    href: "/services/baby-shower",
    order: 5,
    isActive: true,
  },
  {
    title: "Sports Events",
    image: "/images/Vibrant Stadium Crowd Celebration.png",
    alt: "Sports event photography",
    href: "/services/sports",
    order: 6,
    isActive: true,
  },
  {
    title: "Corporate Events",
    image: "/images/Building Stronger Businesses Together.png",
    alt: "Corporate event photography",
    href: "/services/corporate",
    order: 7,
    isActive: true,
  },
];

const defaultSection: ServicesSectionData = {
  eyebrow: "Our Services",
  heading: "Creating Memories Across Every Occasion",
  description:
    "Every event has a unique story. Explore our photography services and let's capture your special moments with creativity and precision.",
  buttonLabel: "View All Services",
  buttonHref: "/services",
  services: defaultServices,
};

function ServiceCard({
  title,
  image,
  alt,
  href,
  className = "",
}: {
  title: string;
  image: string;
  alt: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative isolate overflow-hidden rounded-2xl bg-neutral-900 ${className}`}
    >
      <Image
        src={image}
        alt={alt || title}
        fill
        sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 25vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

      {/* Card content */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5 lg:p-6">
        <h3 className="text-[15px] font-semibold leading-[1.4] text-white sm:text-lg lg:text-xl">
          {title}
        </h3>

        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition duration-300 group-hover:border-[#d6b477] group-hover:bg-[#d6b477] group-hover:text-black sm:size-10">
          <ArrowRight size={18} strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}

export default function ServicesSection() {
  const [section, setSection] =
    useState<ServicesSectionData>(defaultSection);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        const response = await getHomepageContent();

        if (isMounted && response.success && response.data?.services) {
          setSection({
            ...defaultSection,
            ...response.data.services,
          });
        }
      } catch (error) {
        console.error("Failed to fetch homepage services:", error);
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const services = (
    section.services?.length
      ? section.services
      : defaultServices
  )
    .filter((service) => service.isActive && service.image)
    .sort((a, b) => a.order - b.order);

  const topRow = services.slice(0, 4);
  const bottomRow = services.slice(4);

  return (
    <section className="overflow-hidden bg-[#faf7f1] py-20 text-[#171512] sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

        {/* Section Heading */}
        <div className="mb-12 grid gap-7 lg:mb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">

          {/* Left: eyebrow + heading */}
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#b98c5b] sm:text-sm">
              <span className="inline-block h-px w-8 bg-[#b98c5b]" />
              {section.eyebrow}
            </p>

            <h2
              className="text-[36px] leading-[1.15] tracking-tight sm:text-[44px] md:text-[50px] lg:text-[56px] xl:text-[60px]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {section.heading}

              <span className="ml-4 inline-block h-px w-10 translate-y-[-5px] bg-[#171512]/40 sm:w-14 lg:w-16" />
            </h2>
          </div>

          {/* Right: description + link */}
          <div className="flex flex-col items-start gap-5 lg:items-end lg:pt-9">
            <p className="max-w-lg text-[15px] leading-[1.9] text-neutral-600 sm:text-base lg:text-right">
              {section.description}
            </p>

            <Link
              href={section.buttonHref || "/services"}
              className="group inline-flex items-center gap-3 text-sm font-semibold tracking-wide transition hover:text-[#b98c5b] sm:text-base"
            >
              {section.buttonLabel || "View All Services"}

              <ArrowRight
                size={19}
                strokeWidth={2.2}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Top row: First 4 cards */}
        {topRow.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {topRow.map((service) => (
              <ServiceCard
                key={`${service.title}-${service.order}`}
                title={service.title}
                image={service.image}
                alt={service.alt}
                href={service.href}
                className="h-[230px] sm:h-[280px] md:h-[310px] lg:h-[330px]"
              />
            ))}
          </div>
        )}

        {/* Bottom row: Remaining cards */}
        {bottomRow.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:mt-6 sm:gap-5 lg:grid-cols-3">
            {bottomRow.map((service, index) => (
              <ServiceCard
                key={`${service.title}-${service.order}`}
                title={service.title}
                image={service.image}
                alt={service.alt}
                href={service.href}
                className={`h-[230px] sm:h-[280px] md:h-[310px] lg:h-[330px] ${
                  index === bottomRow.length - 1
                    ? "[&:last-child]:col-span-2 lg:[&:last-child]:col-span-1"
                    : ""
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
