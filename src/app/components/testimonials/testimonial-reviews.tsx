
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { ReviewsSection as ReviewsSectionData } from "@/types/testimonials.types";

interface TestimonialReviewsProps {
  data: ReviewsSectionData;
}

function PersonIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-10 w-10 text-[#f5c66b] sm:h-12 sm:w-12"
      aria-hidden="true"
    >
      <circle
        cx="24"
        cy="15"
        r="8"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M9 39c0-8.3 6.7-14 15-14s15 5.7 15 14v2H9v-2Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M10.2 5C5.7 5.5 3 8.5 3 13v6h7v-7H6.8c.2-2.1 1.4-3.5 3.8-4.2L10.2 5Zm10.8 0c-4.5.5-7.2 3.5-7.2 8v6h7v-7h-3.2c.2-2.1 1.4-3.5 3.8-4.2L21 5Z" />
    </svg>
  );
}

export default function TestimonialReviews({
  data,
}: TestimonialReviewsProps) {
  const [page, setPage] = useState(0);

  // Active testimonials sorted by order
  const activeTestimonials = useMemo(() => {
    return data.testimonials
      .filter((item) => item.isActive)
      .sort((a, b) => a.order - b.order);
  }, [data.testimonials]);

  // Pagination
  const reviewsPerPage = 3;

  const totalPages = Math.ceil(
    activeTestimonials.length / reviewsPerPage
  );

  const currentPage =
    totalPages > 0 ? Math.min(page, totalPages - 1) : 0;

  const visibleReviews = activeTestimonials.slice(
    currentPage * reviewsPerPage,
    currentPage * reviewsPerPage + reviewsPerPage
  );

  const changePage = (direction: number) => {
    if (totalPages <= 1) return;

    setPage(
      (current) => (current + direction + totalPages) % totalPages
    );
  };

  return (
    <section className="relative isolate w-full overflow-hidden border-y border-[#c99b4e]/40 bg-[#080706] text-white">
      {/* Full-section background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={data.backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/70" />

      {/* Soft gold ambience */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_30%,rgba(155,100,32,0.16),transparent_60%)]" />

      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-64 w-64 rounded-full bg-[#d9a64f]/[0.07] blur-[100px]" />

      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#e9b84f]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e9b84f] sm:text-xs">
              {data.eyebrow}
            </p>

            <span className="h-px w-8 bg-[#e9b84f]" />
          </div>

          <h2 className="font-serif text-[clamp(2rem,4.5vw,4rem)] leading-tight tracking-tight">
            {data.heading.split(" ").slice(0, 2).join(" ")}{" "}
            <span className="italic text-[#e9b84f]">
              {data.heading.split(" ").slice(2).join(" ")}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
            {data.description}
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="relative mt-10 sm:mt-12">
          {/* Previous arrow — desktop */}
          <button
            type="button"
            onClick={() => changePage(-1)}
            disabled={totalPages <= 1}
            aria-label="Previous testimonials"
            className="absolute -left-2 top-1/2 z-20 hidden h-10 w-10 -translate-x-full -translate-y-1/2 items-center justify-center rounded-full border border-[#d7a747] text-[#e9b84f] transition hover:bg-[#e9b84f] hover:text-black disabled:cursor-not-allowed disabled:opacity-40 xl:flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="m15 18-6-6 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleReviews.map((item) => (
              <article
                key={item._id || item.name}
                className="group relative flex h-full flex-col rounded-xl border border-[#bd8d35]/65 bg-gradient-to-br from-[#15110b]/95 to-[#090807]/95 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#edbd58] hover:shadow-[0_15px_45px_rgba(0,0,0,0.35)] sm:p-6"
              >
                {/* Quote icon and person icon */}
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2c260] text-[#171009]">
                    <QuoteIcon />
                  </div>

                  <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-[#e9b84f] bg-[#21180d] shadow-[0_0_24px_rgba(233,184,79,0.10)]">
                    <PersonIcon />
                  </div>

                  <span className="w-10" />
                </div>

                {/* Dynamic star rating */}
                <div
                  className="mt-5 flex justify-center gap-1 text-xl text-[#f3b900]"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < item.rating
                          ? "text-[#f3b900]"
                          : "text-white/25"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Review text */}
                <blockquote className="mt-4 flex-1 text-center text-sm leading-6 text-white/80 sm:text-[15px] sm:leading-7">
                  “{item.review}”
                </blockquote>

                <div className="mx-auto mb-4 mt-5 h-px w-10 bg-[#e9b84f]/80" />

                {/* Client details */}
                <div className="text-center">
                  <h3 className="font-serif text-xl italic text-[#e9b84f] sm:text-2xl">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    {item.service}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Empty state */}
          {visibleReviews.length === 0 && (
            <div className="py-12 text-center text-sm text-white/60">
              No testimonials available at the moment.
            </div>
          )}

          {/* Next arrow — desktop */}
          <button
            type="button"
            onClick={() => changePage(1)}
            disabled={totalPages <= 1}
            aria-label="Next testimonials"
            className="absolute -right-2 top-1/2 z-20 hidden h-10 w-10 translate-x-full -translate-y-1/2 items-center justify-center rounded-full border border-[#d7a747] text-[#e9b84f] transition hover:bg-[#e9b84f] hover:text-black disabled:cursor-not-allowed disabled:opacity-40 xl:flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="m9 18 6-6-6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Dynamic pagination dots */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                aria-label={`Show testimonial page ${index + 1}`}
                aria-pressed={currentPage === index}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? "w-7 bg-[#f2c260]"
                    : "w-2.5 bg-white/35 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}

        {/* Mobile and tablet navigation */}
        {totalPages > 1 && (
          <div className="mt-5 flex justify-center gap-3 xl:hidden">
            <button
              type="button"
              onClick={() => changePage(-1)}
              className="rounded-full border border-[#d7a747]/60 px-5 py-2 text-xs text-[#e9b84f] transition hover:bg-[#e9b84f] hover:text-black"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() => changePage(1)}
              className="rounded-full border border-[#d7a747]/60 px-5 py-2 text-xs text-[#e9b84f] transition hover:bg-[#e9b84f] hover:text-black"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Fine gold borders */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#e8c878]/50 to-transparent" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e8c878]/50 to-transparent" />
    </section>
  );
}
