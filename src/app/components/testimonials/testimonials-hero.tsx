
import Image from "next/image";

export default function TestimonialsHero() {
  return (
    <section className="relative isolate w-full overflow-hidden border-b border-[#d9b866]/40 bg-[#080706] text-white">
      {/* Full-width hero background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/testimonials-hero.png"
          alt="Romantic wedding photography at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center]"
        />
      </div>

      {/* Dark overlays for readable text */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080706]/95 via-[#080706]/75 via-[42%] to-transparent" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

      {/* Content — positioned lower to avoid header overlap */}
      <div className="mx-auto flex min-h-[430px] w-full max-w-[1600px] items-center px-6 pb-10 pt-28 sm:min-h-[460px] sm:px-10 sm:pb-12 sm:pt-32 lg:min-h-[500px] lg:px-[8.2%] lg:pb-14 lg:pt-36">
        <div className="max-w-[570px]">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#efbd58] sm:text-xs">
              Real Stories
            </p>

            <span className="h-px w-10 bg-[#e9b84f]" />
          </div>

          {/* Heading */}
          <h1 className="font-serif text-[clamp(3rem,6vw,5.4rem)] leading-[0.94] tracking-[-0.04em] text-[#fffaf2]">
            Client
            <br />
            <span className="italic text-[#efbd58]">
              Testimonials
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-[460px] text-sm leading-6 text-white/80 sm:mt-6 sm:text-base sm:leading-7">
            Real people, real stories, and unforgettable experiences.
            Here’s what our wonderful clients have to say about their
            journey with Naeem Bhojani Photography.
          </p>

          {/* Decorative accent */}
          <div className="mt-7 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e9b84f]" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#e9b84f]" />
            <span className="h-px w-10 bg-[#e9b84f]/40" />
          </div>
        </div>
      </div>

      {/* Subtle gold bottom border */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e8c878]/70 to-transparent" />
    </section>
  );
}
