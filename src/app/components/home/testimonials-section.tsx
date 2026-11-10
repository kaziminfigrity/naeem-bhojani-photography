
"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import { getHomepageContent } from "@/services/api/homepage.api";
import type {
  HomeTestimonialsSection,
  HomeTestimonial,
} from "@/types/homepage.types";

const defaultTestimonials: HomeTestimonial[] = [
  {
    quote:
      "Highly recommended Naeem Bhojani Photography! They made our event memorable with beautiful pictures.",
    name: "Hussain J.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
    rating: 5,
    order: 1,
    isActive: true,
  },
  {
    quote:
      "Professional, talented, and extremely creative. They captured every important moment perfectly.",
    name: "Anjoli P.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces",
    rating: 5,
    order: 2,
    isActive: true,
  },
  {
    quote:
      "Amazing experience! Very professional and delivered stunning results.",
    name: "Rahul S.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&h=160&fit=crop&crop=faces",
    rating: 5,
    order: 3,
    isActive: true,
  },
  {
    quote:
      "The photographs beautifully captured the emotions and special moments of our celebration.",
    name: "Arman K.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces",
    rating: 5,
    order: 4,
    isActive: true,
  },
  {
    quote:
      "Wonderful photography, excellent attention to detail, and a very professional experience.",
    name: "Priya M.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces",
    rating: 5,
    order: 5,
    isActive: true,
  },
  {
    quote:
      "Every picture tells a story. We absolutely loved the final photographs and the service.",
    name: "Dev S.",
    image:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=160&h=160&fit=crop&crop=faces",
    rating: 5,
    order: 6,
    isActive: true,
  },
];

const defaultSection: HomeTestimonialsSection = {
  eyebrow: "Client Testimonials",
  heading: "Words From Our Clients",
  description:
    "Real stories from real people who trusted us with their special moments.",
  testimonials: defaultTestimonials,
};

export default function TestimonialsSection() {
  const [section, setSection] =
    useState<HomeTestimonialsSection>(defaultSection);

  const [page, setPage] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchTestimonials = async () => {
      try {
        const response = await getHomepageContent();

        if (
          isMounted &&
          response.success &&
          response.data?.testimonials
        ) {
          setSection({
            ...defaultSection,
            ...response.data.testimonials,
          });

          setPage(0);
        }
      } catch (error) {
        console.error(
          "Failed to fetch homepage testimonials:",
          error
        );
      }
    };

    fetchTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  const testimonials = (
    section.testimonials?.length
      ? section.testimonials
      : defaultTestimonials
  )
    .filter((item) => item.isActive)
    .sort((a, b) => a.order - b.order);

  const itemsPerPage = 3;

  const totalPages = Math.max(
    1,
    Math.ceil(testimonials.length / itemsPerPage)
  );

  const currentPage = Math.min(page, totalPages - 1);

  const visibleTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const changePage = (direction: number) => {
    setPage(
      (current) => (current + direction + totalPages) % totalPages
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#faf7f1] px-5 py-16 text-[#191919] sm:px-8 sm:py-20 lg:px-12 lg:py-24">

      {/* DECORATIVE CURVES */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full border border-[#e8d5b7]/70" />

      <div className="pointer-events-none absolute -bottom-32 -right-20 size-80 rounded-full border border-[#e8d5b7]/70" />

      {/* HEADING */}
      <div className="relative z-10 mx-auto mb-10 max-w-4xl text-center sm:mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#b78b51]">
          {section.eyebrow}
        </p>

        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {section.heading}
        </h2>

        <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base">
          {section.description}
        </p>
      </div>

      {/* TESTIMONIAL CARDS AND ARROWS */}
      <div className="relative mx-auto max-w-[1600px]">

        {/* PREVIOUS BUTTON - DESKTOP */}
        <button
          type="button"
          aria-label="Previous testimonials"
          onClick={() => changePage(-1)}
          disabled={totalPages <= 1}
          className="absolute -left-2 top-1/2 z-20 hidden size-11 -translate-x-full -translate-y-1/2 items-center justify-center rounded-full border border-[#c9a36d] text-neutral-800 transition hover:bg-[#edc88e] disabled:cursor-not-allowed disabled:opacity-40 xl:flex"
        >
          <ArrowLeft size={20} />
        </button>

        {/* TESTIMONIAL GRID */}
        {visibleTestimonials.length > 0 ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {visibleTestimonials.map((item, index) => (
              <article
                key={`${item.name}-${item.order}`}
                className={`flex min-h-[285px] flex-col justify-between rounded-3xl p-6 shadow-[0_12px_35px_rgba(0,0,0,0.06)] transition sm:p-8 ${
                  index === 1
                    ? "bg-[#111111] text-white"
                    : "border border-white bg-white text-[#191919]"
                }`}
              >
                <p className="text-base leading-7 sm:text-lg sm:leading-8">
                  “{item.quote}”
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={`${item.name} portrait`}
                    loading="lazy"
                    className="size-16 shrink-0 rounded-full object-cover ring-2 ring-white/20 sm:size-[76px]"
                  />

                  <div>
                    <h3 className="text-base font-medium sm:text-lg">
                      {item.name}
                    </h3>

                    <div
                      className="mt-2 flex gap-1 text-[#f4ad00]"
                      aria-label={`${item.rating} out of 5 stars`}
                    >
                      {Array.from({
                        length: Math.min(
                          5,
                          Math.max(0, item.rating || 0)
                        ),
                      }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={19}
                          fill="currentColor"
                          strokeWidth={1}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-neutral-500">
            No testimonials available.
          </p>
        )}

        {/* NEXT BUTTON - DESKTOP */}
        <button
          type="button"
          aria-label="Next testimonials"
          onClick={() => changePage(1)}
          disabled={totalPages <= 1}
          className="absolute -right-2 top-1/2 z-20 hidden size-11 translate-x-full -translate-y-1/2 items-center justify-center rounded-full border border-[#c9a36d] text-neutral-800 transition hover:bg-[#edc88e] disabled:cursor-not-allowed disabled:opacity-40 xl:flex"
        >
          <ArrowRight size={20} />
        </button>

        {/* MOBILE / TABLET ARROWS */}
        <div className="mt-7 flex items-center justify-center gap-4 xl:hidden">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => changePage(-1)}
            disabled={totalPages <= 1}
            className="flex size-10 items-center justify-center rounded-full border border-[#c9a36d] transition hover:bg-[#edc88e] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={18} />
          </button>

          <span className="text-xs text-neutral-500">
            {currentPage + 1} / {totalPages}
          </span>

          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => changePage(1)}
            disabled={totalPages <= 1}
            className="flex size-10 items-center justify-center rounded-full border border-[#c9a36d] transition hover:bg-[#edc88e] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* PAGINATION DOTS */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-3">
            {Array.from({ length: totalPages }).map((_, dot) => (
              <button
                key={dot}
                type="button"
                aria-label={`Show testimonial page ${dot + 1}`}
                aria-current={currentPage === dot ? "page" : undefined}
                onClick={() => setPage(dot)}
                className={`size-2.5 rounded-full transition ${
                  currentPage === dot
                    ? "bg-[#c99b5d]"
                    : "bg-[#e9decd]"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
