
import Image from "next/image";
import Link from "next/link";

export default function ClientStories() {
  return (
    <section className="relative isolate w-full overflow-hidden border-y border-[#d9b866]/40 bg-[#080706] text-white">
      {/* Full background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/client-stories.png"
          alt="Photography stories and memorable client moments"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <div className="mx-auto flex min-h-[360px] max-w-[1600px] items-center px-5 py-14 sm:min-h-[400px] sm:px-8 lg:min-h-[440px] lg:px-16">
        {/* Text content in the open center area */}
        <div className="ml-auto w-full max-w-[520px] text-center lg:mr-[21%] lg:w-[38%]">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#e9b84f]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e9b84f] sm:text-xs">
              Client Stories
            </p>

            <span className="h-px w-7 bg-[#e9b84f]" />
          </div>

          <h2 className="font-serif text-[clamp(2rem,3.4vw,3.5rem)] leading-[1.05] tracking-tight text-[#fffaf2]">
            Hear It From
            <br />
            <span className="italic text-[#e9b84f]">
              Our Clients
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[410px] text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
            Moments, emotions, and real experiences shared by the
            amazing people who chose us to be a part of their
            special journey.
          </p>

          <Link
            href="/testimonials"
            className="group mt-6 inline-flex min-h-11 items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#f2bd59] to-[#ffda85] px-7 py-3 text-sm font-semibold text-[#171009] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(233,184,79,0.3)]"
          >
            Explore Client Stories

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
          </Link>
        </div>
      </div>

      {/* Subtle gold borders */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#e8c878]/60 to-transparent" />

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e8c878]/60 to-transparent" />
    </section>
  );
}
