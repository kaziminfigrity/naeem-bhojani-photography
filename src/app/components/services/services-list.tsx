
import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Wedding Photography",
    description:
      "Capturing your big day with a perfect blend of candid and traditional moments.",
    image: "/images/Festive Wedding Portrait Under Floral Arch.png",
    alt: "Beautiful Indian wedding couple portrait",
    href: "/contact",
  },
  {
    number: "02",
    title: "Product Photography",
    description:
      "High-quality product shots that make your brand stand out in the market.",
    image: "/images/service-product.png",
    alt: "Premium product photography",
    href: "/contact",
  },
  {
    number: "03",
    title: "Birthday Party",
    description:
      "Preserve the joy and excitement of your special celebrations.",
    image: "/images/service-birthday.png",
    alt: "Joyful birthday celebration",
    href: "/contact",
  },
  {
    number: "04",
    title: "Head Shots",
    description:
      "Professional headshots for individuals and teams to create a lasting impression.",
    image: "/images/Thoughtful Attendee with Laptop.png",
    alt: "Professional corporate portrait",
    href: "/contact",
  },
  {
    number: "05",
    title: "Baby Shower",
    description:
      "Beautifully capturing the precious moments of your new beginning.",
    image: "/images/philosophy-baby.png",
    alt: "Baby portrait photography",
    href: "/contact",
  },
  {
    number: "06",
    title: "Sport Events",
    description:
      "Dynamic and high-energy coverage of your sports events and tournaments.",
    image: "/images/Cricket Celebration High-Five.png",
    alt: "Sports event photography",
    href: "/contact",
  },
  {
    number: "07",
    title: "Corporate Events",
    description:
      "Professional coverage for conferences, seminars, and business events.",
    image: "/images/service-corporate.png",
    alt: "Corporate event and conference photography",
    href: "/contact",
  },
  {
    number: "08",
    title: "Other Services",
    description:
      "Custom photography solutions tailored to your unique requirements.",
    image: "/images/Cinematic Canon EOS 5D Mark IV on Stone.png",
    alt: "Professional photography camera",
    href: "/contact",
  },
];

export default function ServicesList() {
  return (
    <section
      id="all-services"
      className="relative isolate overflow-hidden bg-[#f8f5ef] py-20 text-[#171512] sm:py-24 lg:py-28"
    >
      {/* Subtle background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 -z-10 select-none font-serif text-[180px] italic leading-none text-[#b38a4a]/[0.055] sm:right-10 sm:text-[260px] lg:text-[320px]"
      >
        Services
      </div>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section introduction */}
        <div className="mb-10 grid gap-6 lg:mb-12 lg:grid-cols-[1.15fr_0.65fr] lg:items-end lg:gap-16">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-[#b68a45]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a77c39] sm:text-xs">
                What We Do
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Explore Our{" "}
              <span className="italic text-[#b58a4b]">Services</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#625e58] sm:text-base">
              Professional photography services tailored to your special
              moments and unique needs.
            </p>
          </div>

          <p className="max-w-lg text-sm leading-7 text-[#514d47] lg:justify-self-end lg:pb-1 lg:text-[15px]">
            We believe every occasion has a story worth telling. Our services
            are designed to beautifully capture those stories with creativity
            and care.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map((service) => (
            <article
              key={service.number}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e8e0d5] bg-[#fffdfa] shadow-[0_5px_18px_rgba(48,35,18,0.045)] transition-all duration-500 hover:-translate-y-1 hover:border-[#c6a16a]/60 hover:shadow-[0_16px_36px_rgba(48,35,18,0.12)]"
            >
              {/* Image */}
              <a
                href={service.href}
                aria-label={`Enquire about ${service.title}`}
                className="relative block aspect-[4/3] overflow-hidden bg-[#e9e2d8]"
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="absolute left-4 top-4 flex h-8 min-w-8 items-center justify-center rounded-full border border-white/50 bg-black/25 px-2 text-[10px] tracking-wider text-white backdrop-blur-sm">
                  {service.number}
                </span>
              </a>

              {/* Card content */}
              <div className="flex flex-1 flex-col p-5 sm:p-5 lg:p-[18px] xl:p-5">
                <h3 className="font-serif text-xl font-semibold leading-snug tracking-tight sm:text-[21px]">
                  {service.title}
                </h3>

                <p className="mt-2 flex-1 text-[13px] leading-[1.8] text-[#69635b] sm:text-sm">
                  {service.description}
                </p>

                <a
                  href={service.href}
                  className="group/link mt-5 inline-flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#27231e] transition-colors hover:text-[#a77c39]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171512] text-white transition-all duration-300 group-hover/link:bg-[#b58a4b] group-hover/link:text-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12h14m-6-6 6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>Learn More</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-[#dfd5c7] pt-7 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-6 text-[#6a6258]">
            Every moment is unique. Let us create photographs you will treasure
            for a lifetime.
          </p>

          <a
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8f672f] transition-colors hover:text-black"
          >
            Discuss Your Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
