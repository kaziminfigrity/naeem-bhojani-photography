
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Wedding",
    subtitle: "Photography",
    image: "/images/service-wedding.png",
    alt: "Elegant wedding couple photography",
  },
  {
    title: "Pre-Wedding",
    subtitle: "Photography",
    image: "/images/service-prewedding.png",
    alt: "Romantic pre-wedding couple photography",
  },
  {
    title: "Birthday",
    subtitle: "Photography",
    image: "/images/service-birthday.png",
    alt: "Birthday celebration photography",
  },
  {
    title: "Maternity",
    subtitle: "Photography",
    image: "/images/service-maternity.png",
    alt: "Maternity portrait photography",
  },
  {
    title: "Family Shoot",
    subtitle: "",
    image: "/images/service-family.png",
    alt: "Family portrait photography",
  },
  {
    title: "Product",
    subtitle: "Photography",
    image: "/images/service-product.png",
    alt: "Premium product photography",
  },
  {
    title: "Corporate",
    subtitle: "Events",
    image: "/images/service-corporate.png",
    alt: "Corporate event photography",
  },
  {
    title: "Sports",
    subtitle: "Photography",
    image: "/images/service-sports.png",
    alt: "Sports action photography",
  },
];

export default function OurExpertise() {
  return (
    <section className="relative isolate overflow-hidden bg-[#080706] py-16 text-white sm:py-20 lg:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#d6b477]/[0.06] blur-[100px]" />

      <div className="relative mx-auto grid max-w-[1750px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10 lg:px-12 xl:gap-14 xl:px-16">
        {/* Left: Section Introduction */}
        <div className="max-w-[620px]">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#deb575] sm:text-sm">
            Our Expertise
          </p>

          <h2 className="font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-[52px] xl:text-[64px]">
            More Than
            <br />
            <span className="text-[#deb575]">Just Weddings</span>
          </h2>

          <p className="mt-6 max-w-[580px] text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            From weddings to corporate events, from birthday celebrations
            to product shoots, we cover a wide range of photography
            services. Each category brings a new story, a new set of
            emotions, and a new creative challenge — and that&apos;s what
            makes our journey exciting.
          </p>

          <Link
            href="/services"
            className="group mt-8 inline-flex min-h-14 items-center gap-5 rounded-full bg-[#f2c57f] px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-white sm:px-9"
          >
            Explore Our Services

            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Right: Photography Service Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 xl:gap-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href="/services"
              aria-label={`${service.title} ${service.subtitle}`.trim()}
              className="group relative isolate aspect-[0.82/1] overflow-hidden rounded-sm border border-[#b99252]/70 bg-[#15120e] sm:aspect-[0.9/1] xl:aspect-[0.78/1]"
            >
              {/* Service Image */}
              <Image
                src={service.image}
                alt={service.alt}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1280px) 40vw, 22vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Gradient for Readable Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Card Content */}
              <div className="absolute inset-x-2 bottom-4 z-10 text-center sm:bottom-5 sm:inset-x-3">
                <h3 className="text-sm font-medium leading-snug text-white sm:text-base lg:text-lg">
                  {service.title}
                  {service.subtitle && (
                    <>
                      <br />
                      {service.subtitle}
                    </>
                  )}
                </h3>

                <span className="mx-auto mt-3 block h-[2px] w-9 bg-[#e8bd70] transition-all duration-300 group-hover:w-14" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
