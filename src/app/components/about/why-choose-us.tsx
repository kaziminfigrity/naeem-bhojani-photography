
import {
  Camera,
  UsersRound,
  Star,
  Heart,
} from "lucide-react";

const features = [
  {
    title: "Professional Approach",
    description:
      "High-quality photography with attention to detail",
    Icon: Camera,
  },
  {
    title: "Personal Connection",
    description: "We take time to understand your story",
    Icon: UsersRound,
  },
  {
    title: "Creative Vision",
    description: "Unique and artistic style for every event",
    Icon: Star,
  },
  {
    title: "Timeless Memories",
    description: "Images that last a lifetime",
    Icon: Heart,
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative isolate overflow-hidden bg-black py-16 text-white sm:py-20 lg:py-24"
      aria-labelledby="why-choose-us-heading"
    >
      {/* Decorative gold glow */}
      <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#d6b477]/[0.05] blur-[100px]" />

      <div className="relative mx-auto grid max-w-[1650px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 xl:px-16">
        {/* Left: Heading and Description */}
        <div className="max-w-[700px]">
          <div className="mb-6 flex items-center gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e5b967] sm:text-sm">
              Why Choose Us
            </p>
            <span className="h-px w-16 bg-[#d6b477]" />
          </div>

          <h2
            id="why-choose-us-heading"
            className="font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-[54px] xl:text-[68px]"
          >
            Turning Moments
            <br />
            <span className="text-[#e5b967]">
              Into Memories
            </span>
          </h2>

          <p className="mt-7 max-w-[650px] text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            We focus on quality, creativity and a personal approach
            to make your experience comfortable and memorable.
            Our goal is not just to take photos, but to create
            stories that you will cherish forever.
          </p>
        </div>

        {/* Right: Features */}
        <div className="relative lg:border-l lg:border-[#d6b477]/40 lg:pl-10 xl:pl-16">
          <div className="space-y-8 sm:space-y-9">
            {features.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="group flex items-center gap-5 sm:gap-7"
              >
                {/* Gold Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-[68px] sm:w-[68px]">
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.6}
                    className="h-9 w-9 text-[#e5b967] transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11"
                  />
                </div>

                {/* Feature Text */}
                <div>
                  <h3 className="text-base font-semibold text-white sm:text-lg lg:text-xl">
                    {title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-white/70 sm:text-base">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
