
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const topRow = [
  {
    title: "Wedding Photography",
    image: "/images/Golden Hour Indian Wedding Portrait.png",
    href: "/services/wedding",
  },
  {
    title: "Products Photography",
    image: "/images/Luxe Bella Perfume Still Life.png",
    href: "/services/products",
  },
  {
    title: "Birthday Parties",
    image: "/images/Princess Birthday Dessert Celebration.png",
    href: "/services/birthday",
  },
  {
    title: "Headshots",
    image: "/images/Confident Corporate Portrait with Warm Bokeh.png",
    href: "/services/headshots",
  },
];

const bottomRow = [
  {
    title: "Baby Shower",
    image: "/images/Joyful Baby in a Dreamy Pink Celebration.png",
    href: "/services/baby-shower",
  },
  {
    title: "Sports Events",
    image: "/images/Vibrant Stadium Crowd Celebration.png",
    href: "/services/sports",
  },
  {
    title: "Corporate Events",
    image: "/images/Building Stronger Businesses Together.png",
    href: "/services/corporate",
  },
];

function ServiceCard({
  title,
  image,
  href,
  className = "",
}: {
  title: string;
  image: string;
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
        alt={title}
        fill
        sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 25vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Dark gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

      {/* Card content: title + arrow */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-5">
        <h3 className="text-[13px] font-medium leading-[1.35] sm:text-[15px]">
          {title}
        </h3>

        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/60 transition duration-300 group-hover:border-[#d6b477] group-hover:bg-[#d6b477] group-hover:text-black sm:size-9">
          <ArrowRight size={15} strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}

export default function ServicesSection() {
  return (
    <section className="overflow-hidden bg-[#faf7f1] py-16 text-[#171512] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-10">
          {/* Left: eyebrow + heading */}
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b98c5b] sm:text-xs">
              <span className="inline-block h-px w-6 bg-[#b98c5b]" />
              Our Services
            </p>

            <h2
              className="text-[32px] leading-[1.15] tracking-tight sm:text-[40px] md:text-[46px] lg:text-[52px]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Creating Memories
              <br />
              Across Every Occasion
              <span className="ml-4 inline-block h-px w-10 translate-y-[-4px] bg-[#171512]/40 sm:w-14 lg:w-16" />
            </h2>
          </div>

          {/* Right: description + link */}
          <div className="flex flex-col items-start gap-4 lg:items-end lg:pt-8">
            <p className="max-w-md text-[13px] leading-[1.8] text-neutral-500 sm:text-[14px] lg:text-right">
              Every event has a unique story. Explore our photography services
              and let's capture your special moments with creativity and precision.
            </p>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-wide transition hover:text-[#b98c5b]"
            >
              View All Services
              <ArrowRight
                size={16}
                strokeWidth={2.2}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Top row: 4 cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {topRow.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              image={service.image}
              href={service.href}
              className="h-[220px] sm:h-[260px] md:h-[290px] lg:h-[310px]"
            />
          ))}
        </div>

        {/* Bottom row: 3 cards */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-3">
          {bottomRow.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              image={service.image}
              href={service.href}
              className="h-[220px] sm:h-[260px] md:h-[290px] lg:h-[310px] [&:last-child]:col-span-2 lg:[&:last-child]:col-span-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
