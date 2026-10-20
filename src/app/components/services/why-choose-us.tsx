
import Image from "next/image";

const features = [
  {
    title: "Professional Equipment",
    description: "High-end gear for stunning results.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9 sm:h-11 sm:w-11">
        <path
          d="M6 15h9l4-5h10l4 5h9a3 3 0 0 1 3 3v19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V18a3 3 0 0 1 3-3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="26" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="26" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Experienced Team",
    description: "Years of experience in diverse events.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9 sm:h-11 sm:w-11">
        <circle cx="18" cy="15" r="7" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="34" cy="17" r="5.5" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M4 38v-3c0-7 6-12 14-12s14 5 14 12v3H4Zm26-13c7 0 13 4 13 11v2H35"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Creative Approach",
    description: "Unique and artistic storytelling.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9 sm:h-11 sm:w-11">
        <path
          d="M24 41S5 29 5 16c0-6 4-10 10-10 4 0 7 2 9 6 2-4 5-6 9-6 6 0 10 4 10 10 0 13-19 25-19 25Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Client Satisfaction",
    description: "Your happiness is our priority.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9 sm:h-11 sm:w-11">
        <path
          d="m24 4 6.2 13 14.3 2.1-10.3 10 2.4 14.2L24 36.6 11.4 43.3l2.4-14.2-10.3-10L17.8 17 24 4Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative isolate overflow-hidden bg-[#080807] text-white">
      {/* Background photograph */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/images/why-choose-us-bg.png"
          alt="Photographer working with professional camera equipment"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark cinematic overlays */}
      <div className="absolute inset-0 -z-20 bg-black/65" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/95 via-black/75 to-black/90" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#e6b752]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e6b752] sm:text-xs">
                Why Choose Us
              </span>
            </div>

            <h2 className="font-serif text-4xl leading-[1.03] tracking-tight text-[#fffdf8] sm:text-5xl lg:text-6xl xl:text-7xl">
              More Than Just
              <br />
              Photography
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
              We don’t just take pictures, we capture emotions, connections,
              and stories that last a lifetime.
            </p>

            <a
              href="/contact"
              className="group mt-8 inline-flex min-h-12 items-center gap-4 rounded-full bg-[#edbd63] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.13em] text-[#17120a] transition duration-300 hover:bg-[#ffda91]"
            >
              Book a Session
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M4 12h15m-6-6 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Right feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className={`group flex gap-4 border-white/15 py-7 sm:gap-5 sm:px-5 lg:gap-6 lg:px-6 lg:py-8 ${
                  index < 2 ? "sm:border-b" : ""
                } ${index % 2 === 0 ? "sm:border-r" : ""} ${
                  index === 0 || index === 2 ? "sm:pl-0" : ""
                } ${index === 1 || index === 3 ? "sm:pr-0" : ""} ${
                  index < 2 ? "pt-0" : ""
                } ${index >= 2 ? "pb-0" : ""}`}
              >
                <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full border border-[#d9a943]/80 text-[#efbd58] transition duration-300 group-hover:bg-[#e8b653]/10 sm:h-[88px] sm:w-[88px] lg:h-[100px] lg:w-[100px]">
                  {feature.icon}
                </div>

                <div className="pt-1">
                  <h3 className="max-w-[210px] font-serif text-xl leading-tight text-white sm:text-2xl">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-[230px] text-sm leading-6 text-white/65">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#d9a943]/50 to-transparent" />
    </section>
  );
}
