
"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Highly recommended Naeem Bhojani Photography! They made our event memorable with beautiful pictures.",
    name: "Hussain J.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote:
      "Professional, talented, and extremely creative. They captured every important moment perfectly.",
    name: "Anjoli P.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote:
      "Amazing experience! Very professional and delivered stunning results.",
    name: "Rahul S.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote:
      "The photographs beautifully captured the emotions and special moments of our celebration.",
    name: "Arman K.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote:
      "Wonderful photography, excellent attention to detail, and a very professional experience.",
    name: "Priya M.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces",
  },
  {
    quote:
      "Every picture tells a story. We absolutely loved the final photographs and the service.",
    name: "Dev S.",
    image:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=160&h=160&fit=crop&crop=faces",
  },
];

export default function TestimonialsSection() {
  const [page, setPage] = useState(0);

  const visibleTestimonials = testimonials.slice(page * 3, page * 3 + 3);

  const changePage = (direction: number) => {
    setPage((current) => (current + direction + 2) % 2);
  };

  return (
    <section className="relative overflow-hidden bg-[#faf7f1] px-5 py-16 text-[#191919] sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      {/* Decorative curves */}
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full border border-[#e8d5b7]/70" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 size-80 rounded-full border border-[#e8d5b7]/70" />

      {/* Heading */}
      <div className="relative z-10 mx-auto mb-10 max-w-4xl text-center sm:mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#b78b51]">
          Client Testimonials
        </p>

        <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Words From Our Clients
        </h2>

        <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base">
          Real stories from real people who trusted us with their special moments.
        </p>
      </div>

      {/* Testimonial cards and arrows */}
      <div className="relative mx-auto max-w-[1600px]">
        <button
          type="button"
          aria-label="Previous testimonials"
          onClick={() => changePage(-1)}
          className="absolute -left-2 top-1/2 z-20 hidden size-11 -translate-x-full -translate-y-1/2 items-center justify-center rounded-full border border-[#c9a36d] text-neutral-800 transition hover:bg-[#edc88e] xl:flex"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="grid gap-5 lg:grid-cols-3">
          {visibleTestimonials.map((item, index) => (
            <article
              key={item.name}
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
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => (
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

        <button
          type="button"
          aria-label="Next testimonials"
          onClick={() => changePage(1)}
          className="absolute -right-2 top-1/2 z-20 hidden size-11 translate-x-full -translate-y-1/2 items-center justify-center rounded-full border border-[#c9a36d] text-neutral-800 transition hover:bg-[#edc88e] xl:flex"
        >
          <ArrowRight size={20} />
        </button>

        {/* Mobile/tablet arrows */}
        <div className="mt-7 flex items-center justify-center gap-4 xl:hidden">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => changePage(-1)}
            className="flex size-10 items-center justify-center rounded-full border border-[#c9a36d] transition hover:bg-[#edc88e]"
          >
            <ArrowLeft size={18} />
          </button>

          <span className="text-xs text-neutral-500">
            {page + 1} / 2
          </span>

          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => changePage(1)}
            className="flex size-10 items-center justify-center rounded-full border border-[#c9a36d] transition hover:bg-[#edc88e]"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex justify-center gap-3">
          {[0, 1].map((dot) => (
            <button
              key={dot}
              type="button"
              aria-label={`Show testimonial page ${dot + 1}`}
              onClick={() => setPage(dot)}
              className={`size-2.5 rounded-full transition ${
                page === dot ? "bg-[#c99b5d]" : "bg-[#e9decd]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
