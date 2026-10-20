
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  ScanEye,
  UsersRound,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Creative Vision",
    description: "Unique and artistic approach to every event.",
    icon: Camera,
  },
  {
    title: "Attention to Detail",
    description: "Every moment captured with precision.",
    icon: ScanEye,
  },
  {
    title: "Professional Team",
    description: "Experienced and dedicated photography experts.",
    icon: UsersRound,
  },
  {
    title: "Timeless Memories",
    description: "Images that tell your story forever.",
    icon: CalendarCheck,
  },
];

export default function AboutSection() {
  return (
    <section className="bg-[#faf7f1] px-5 py-16 text-[#171717] sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-[1700px] items-center gap-12 lg:grid-cols-[0.9fr_1.3fr_0.85fr] lg:gap-10 xl:gap-14">
        {/* Photographer Image */}
        <div className="relative mx-auto w-full max-w-[440px] pb-8 lg:mx-0">
          <div className="absolute -left-5 top-1/4 h-2/3 w-4/5 rounded-3xl bg-[#efdfc8]" />

          <div className="relative h-[420px] overflow-hidden rounded-2xl sm:h-[500px]">
            <Image
              src="/images/Smiling Event Photographer with Camera Rig.png"
              alt="Naeem Bhojani, photographer"
              fill
              priority={false}
              sizes="(max-width: 1024px) 90vw, 30vw"
              className="object-cover object-center"
            />
          </div>

          <div className="absolute -bottom-1 left-0 rounded-xl bg-[#faf7f1] px-5 py-4 shadow-sm sm:left-[-12px]">
            <p className="font-serif text-2xl italic sm:text-3xl">
              Naeem Bhojani
            </p>
            <p className="mt-1 text-center text-[10px] uppercase tracking-[0.18em] text-neutral-600">
              Founder & Photographer
            </p>
          </div>
        </div>

        {/* About Content */}
        <div className="py-4">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#c49a62]">
            About Naeem Bhojani
          </p>

          <h2 className="font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl xl:text-6xl">
            Turning Moments
            <br className="hidden xl:block" /> Into Timeless Memories
          </h2>

          <p className="mt-6 text-sm leading-7 text-neutral-600 sm:text-base sm:leading-8">
            As a photographer, I am a visual storyteller with an unwavering
            passion for capturing the world through my lens. What began as a
            childhood passion is now a journey of turning fleeting moments
            into timeless memories. For the past 6+ years, I have been
            capturing love, emotions, and stories that last forever.
          </p>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-4 rounded-full bg-[#edc88e] px-7 py-4 text-sm font-semibold text-black transition hover:bg-[#dfb675] sm:px-9"
          >
            Know More About Me
            <ArrowRight
              size={19}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Photography Features */}
        <div className="border-t border-[#e5d7c5] pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-10">
          <div className="space-y-7 sm:space-y-8">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="flex items-center gap-4 sm:gap-5"
                >
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#f1e5d3] sm:size-[72px]">
                    <Icon
                      size={27}
                      strokeWidth={1.6}
                      className="text-[#25211c]"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="mt-1 max-w-[230px] text-xs leading-5 text-neutral-600 sm:text-sm sm:leading-6">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
