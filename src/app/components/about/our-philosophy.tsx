
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const philosophyImages = [
  {
    src: "/images/philosophy-wedding.png",
    alt: "Wedding details and genuine emotions",
    position:
      "left-[3%] top-[5%] z-10 h-[48%] w-[34%] -rotate-6",
  },
  {
    src: "/images/philosophy-couple.png",
    alt: "Couple sharing a beautiful sunset moment",
    position:
      "left-[34%] top-[5%] z-20 h-[59%] w-[34%] rotate-2",
  },
  {
    src: "/images/philosophy-baby.png",
    alt: "Baby portrait photography",
    position:
      "right-[2%] top-[7%] z-10 h-[47%] w-[29%] rotate-[-4deg]",
  },
  {
    src: "/images/philosophy-coffee.png",
    alt: "Warm lifestyle and detail photography",
    position:
      "left-[10%] bottom-[7%] z-30 h-[35%] w-[34%] rotate-3",
  },
  {
    src: "/images/philosophy-detail.png",
    alt: "Creative detail photography",
    position:
      "left-[42%] bottom-[3%] z-20 h-[32%] w-[23%] -rotate-3",
  },
  {
    src: "/images/philosophy-event.png",
    alt: "Corporate event photography",
    position:
      "right-[1%] bottom-[7%] z-30 h-[38%] w-[35%] rotate-2",
  },
];

export default function OurPhilosophy() {
  return (
    <section
      id="our-philosophy"
      className="relative overflow-hidden bg-[#080706] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-20 top-1/4 h-80 w-80 rounded-full bg-[#deb575]/[0.05] blur-[100px]" />

      <div className="relative mx-auto grid max-w-[1650px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10 lg:px-12 xl:gap-16 xl:px-16">
        {/* Left: Content */}
        <div className="relative z-40 max-w-[580px]">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#deb575] sm:text-sm">
            Our Philosophy
          </p>

          <h2 className="font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-[54px] xl:text-[64px]">
            Real People
            <br />
            <span className="text-[#deb575]">Real Moments</span>
          </h2>

          <p className="mt-7 max-w-[560px] text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            We believe in capturing genuine emotions, real connections,
            and the true essence of every moment. Whether it&apos;s a
            wedding, a birthday, a corporate event or a simple portrait,
            our approach remains the same — authentic, creative and
            timeless.
          </p>

          <Link
            href="/services"
            className="group mt-8 inline-flex items-center gap-5 rounded-full bg-[#f2c57f] px-7 py-4 text-sm font-semibold text-black transition duration-300 hover:bg-white sm:px-9"
          >
            Our Philosophy
            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Right: Overlapping Photo Collage */}
        <div className="mx-auto w-full max-w-[900px] lg:max-w-none">
          <div className="relative aspect-[1.15/1] w-full sm:aspect-[1.3/1] lg:aspect-[1.05/1]">
            {philosophyImages.map((image) => (
              <div
                key={image.src}
                className={`absolute overflow-hidden border-[3px] border-[#f5e8d1] bg-[#17130e] shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:z-50 hover:scale-105 sm:border-4 ${image.position}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 55vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
