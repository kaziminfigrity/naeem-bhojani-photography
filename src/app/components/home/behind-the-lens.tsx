
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Camera,
  UsersRound,
  Gem,
  Star,
} from "lucide-react";

import { getHomepageContent } from "@/services/api/homepage.api";
import type {
  BehindTheLensSection,
  BehindLensService,
  HomepageStat,
} from "@/types/homepage.types";

const iconMap = {
  Camera,
  UsersRound,
  Gem,
  Star,
};

const defaultServices: BehindLensService[] = [
  {
    title: "Weddings",
    image: "/images/Golden Hour Indian Wedding Portrait.png",
    alt: "Wedding photography",
    href: "/services/wedding",
    order: 1,
    isActive: true,
  },
  {
    title: "Corporate Events",
    image: "/images/Business Networking at a Vibrant Trade Show.png",
    alt: "Corporate event photography",
    href: "/services/corporate",
    order: 2,
    isActive: true,
  },
  {
    title: "Birthday Parties",
    image: "/images/Princess Birthday Dessert Celebration.png",
    alt: "Birthday party photography",
    href: "/services/birthday",
    order: 3,
    isActive: true,
  },
  {
    title: "Sports Events",
    image: "/images/Cricket Celebration High-Five.png",
    alt: "Sports event photography",
    href: "/services/sports",
    order: 4,
    isActive: true,
  },
];

const defaultStats: HomepageStat[] = [
  { value: "1000+", label: "Events Covered", icon: "Camera", order: 1 },
  { value: "500+", label: "Happy Clients", icon: "UsersRound", order: 2 },
  { value: "6+", label: "Years of Experience", icon: "Gem", order: 3 },
  { value: "100%", label: "Client Satisfaction", icon: "Star", order: 4 },
];

const defaultSection: BehindTheLensSection = {
  eyebrow: "Behind the Lens",
  heading: "More Than Photos, We Create Films",
  description:
    "Relive your special moments through cinematic films that move your story unforgettable.",
  backgroundImage: "/images/Cinematic Canon EOS 5D Mark IV on Stone.png",
  statsBackgroundImage: "/images/Golden Alpine Sunset Panorama.png",
  buttonLabel: "Watch Showreel",
  buttonHref: "/portfolio",
  services: defaultServices,
  stats: defaultStats,
};

export default function BehindTheLens() {
  const [section, setSection] =
    useState<BehindTheLensSection>(defaultSection);

  useEffect(() => {
    let isMounted = true;

    const fetchBehindTheLens = async () => {
      try {
        const response = await getHomepageContent();

        if (
          isMounted &&
          response.success &&
          response.data?.behindTheLens
        ) {
          setSection({
            ...defaultSection,
            ...response.data.behindTheLens,
          });
        }
      } catch (error) {
        console.error(
          "Failed to fetch behind the lens section:",
          error
        );
      }
    };

    fetchBehindTheLens();

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

  const stats = (
    section.stats?.length
      ? section.stats
      : defaultStats
  ).sort((a, b) => a.order - b.order);

  return (
    <section className="bg-[#080909] text-white">

      {/* CINEMATIC HERO */}
      <div className="relative isolate min-h-[500px] overflow-hidden lg:min-h-[580px]">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 -z-20">
          <Image
            src={
              section.backgroundImage ||
              defaultSection.backgroundImage
            }
            alt="Photography camera background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-[58%_center]"
          />
        </div>

        {/* GRADIENT OVERLAYS */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/50 to-transparent lg:w-2/3" />

        <div className="absolute inset-y-0 right-0 -z-10 hidden bg-gradient-to-l from-black/85 via-black/40 to-transparent lg:block lg:w-1/2" />

        <div className="absolute inset-0 -z-10 bg-black/40 lg:hidden" />

        {/* CONTENT CONTAINER */}
        <div className="mx-auto flex max-w-[1780px] flex-col justify-between gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[580px] lg:flex-row lg:items-center lg:gap-12 lg:px-12 lg:py-24">

          {/* LEFT TEXT & CTA */}
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#deb575]">
              {section.eyebrow}
            </p>

            <h2 className="font-serif text-4xl leading-[1.12] text-white sm:text-5xl xl:text-6xl">
              {section.heading}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              {section.description}
            </p>

            <div className="mt-8">
              <Link
                href={section.buttonHref || "/portfolio"}
                className="group inline-flex items-center gap-3 rounded-full bg-[#deb575] px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-[#e8c387]"
              >
                {section.buttonLabel || "Watch Showreel"}

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* RIGHT SERVICE LINKS */}
          <div className="flex w-full flex-col gap-3.5 sm:max-w-md lg:w-[350px] xl:w-[380px]">
            {services.map((service) => (
              <Link
                key={`${service.title}-${service.order}`}
                href={service.href || "/services"}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/60 p-2.5 backdrop-blur-md transition-all duration-300 hover:border-[#deb575]/60 hover:bg-black/80"
              >
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={service.image}
                    alt={service.alt || service.title}
                    fill
                    sizes="80px"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <span className="flex-1 text-sm font-medium tracking-wide text-white sm:text-base">
                  {service.title}
                </span>

                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/30 text-white/70 transition-all duration-300 group-hover:border-[#deb575] group-hover:text-[#deb575]">
                  <ChevronRight size={16} strokeWidth={2} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="relative isolate overflow-hidden border-t border-white/15">

        <div className="absolute inset-0 -z-20">
          <Image
            src={
              section.statsBackgroundImage ||
              defaultSection.statsBackgroundImage
            }
            alt="Statistics background"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-black/65" />

        <div className="mx-auto grid max-w-[1600px] grid-cols-2 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-4 lg:px-12 lg:py-16">

          {stats.map((stat, index) => {
            const Icon =
              iconMap[
                stat.icon as keyof typeof iconMap
              ] || Camera;

            return (
              <div
                key={`${stat.label}-${stat.order}`}
                className={`flex flex-col items-center px-4 py-6 text-center sm:px-8 ${
                  index % 2 === 0
                    ? "border-r border-white/15 lg:border-r"
                    : ""
                } ${
                  index < 2
                    ? "border-b border-white/15 lg:border-b-0"
                    : ""
                } ${
                  index === 1
                    ? "lg:border-r lg:border-white/15"
                    : ""
                } ${
                  index === 2
                    ? "lg:border-r lg:border-white/15"
                    : ""
                }`}
              >
                <Icon
                  size={36}
                  strokeWidth={1.3}
                  className="mb-3 text-[#deb575]"
                />

                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs font-normal text-white/80 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
