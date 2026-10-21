
"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactLocation() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapQuery = "Naeem Bhojani Photography, Ahmedabad, Gujarat, India";

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&z=12&output=embed`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    mapQuery
  )}`;

  return (
    <section className="relative isolate overflow-hidden border-y border-[#d9b866]/30 bg-[#090908] text-white">
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/images/contact-location-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#080807]/80" />

      {/* Subtle gold ambience */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_55%,rgba(160,104,36,0.16),transparent_38%),radial-gradient(ellipse_at_90%_20%,rgba(160,104,36,0.10),transparent_32%)]" />

      <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 lg:px-16 lg:py-20">
        {/* LEFT: Studio information */}
        <div className="max-w-[570px]">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#e9b84f]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e9b84f] sm:text-xs">
              Our Location
            </p>

            <span className="h-px w-8 bg-[#e9b84f]/60" />
          </div>

          <h2 className="font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Visit Our{" "}
            <span className="italic text-[#e9b84f]">Studio</span>
          </h2>

          <p className="mt-5 max-w-[490px] text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            We’d be happy to welcome you to our studio. Let’s meet,
            discuss your ideas and plan something extraordinary together.
          </p>

          {/* Address card */}
          <div className="mt-8 rounded-xl border border-[#b98b35]/55 bg-[#0b0a08]/85 p-5 backdrop-blur-sm sm:mt-9 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#e9b84f]/70 bg-[#e9b84f]/[0.07] text-[#e9b84f]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <path
                    d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <div className="min-w-0 pt-1">
                <h3 className="font-serif text-xl text-[#e9b84f] sm:text-2xl">
                  Studio Address
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/90 sm:text-base">
                  Naeem Bhojani Photography
                </p>

                <p className="text-sm leading-6 text-white/65 sm:text-base">
                  Ahmedabad, Gujarat, India
                </p>
              </div>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex min-h-[50px] w-full items-center justify-center gap-3 rounded-full bg-[#f2c260] px-5 py-3 text-sm font-semibold text-[#171009] transition duration-300 hover:bg-[#ffda8b] hover:shadow-[0_0_25px_rgba(233,184,79,0.2)]"
            >
              Get Directions

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M4 12h15m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <p className="mt-3 text-center text-[10px] tracking-wide text-white/45">
              OPEN DIRECTIONS IN GOOGLE MAPS
            </p>
          </div>

          {/* Location note */}
          <div className="mt-6 flex items-center gap-3 text-xs text-white/60">
            <span className="h-2 w-2 rounded-full bg-[#e9b84f]" />
            <span>Let’s plan your next photography session.</span>
          </div>
        </div>

        {/* RIGHT: Interactive Google Map */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl bg-[#d4a342]/[0.10] blur-xl" />

          <div className="relative overflow-hidden rounded-xl border border-[#c7a04c]/70 bg-[#101112] p-1.5 shadow-[0_25px_80px_rgba(0,0,0,0.5)] sm:p-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#17191b] sm:aspect-[1.25/1] lg:aspect-[1.2/1]">
              {!mapLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#121211]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#e9b84f]/50 text-[#e9b84f]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-7 w-7"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </div>

                  <p className="text-xs tracking-[0.15em] text-white/60">
                    LOADING LOCATION MAP
                  </p>
                </div>
              )}

              <iframe
                title="Naeem Bhojani Photography location in Ahmedabad"
                src={mapEmbedUrl}
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.65] contrast-[1.05]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
              />
            </div>
          </div>

          <p className="mt-3 text-right text-[10px] tracking-wide text-white/45">
            AHMEDABAD, GUJARAT, INDIA
          </p>
        </div>
      </div>

      {/* Fine gold borders */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#e9c878]/55 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e9c878]/55 to-transparent" />
    </section>
  );
}
