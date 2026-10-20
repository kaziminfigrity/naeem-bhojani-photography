
import Image from "next/image";

const storyImages = [
  {
    src: "/images/Smiling Event Photographer with Camera Rig.png",
    alt: "Naeem Bhojani working with his camera",
    position:
      "left-[2%] top-[5%] z-10 h-[88%] w-[57%] -rotate-2",
  },
  {
    src: "/images/Golden Bokeh Indian Wedding Portrait.png",
    alt: "Wedding couple photography",
    position:
      "left-[53%] top-[7%] z-20 h-[53%] w-[39%] rotate-2",
  },
  {
    src: "/images/Whimsical Garden Baby Portrait.png",
    alt: "Baby portrait photography",
    position:
      "left-[43%] top-[51%] z-30 h-[39%] w-[30%] -rotate-3",
  },
  {
    src: "/images/Luxury Chronograph on Golden Stone.png",
    alt: "Luxury product photography",
    position:
      "left-[68%] top-[54%] z-20 h-[38%] w-[29%] rotate-2",
  },
];

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="relative overflow-hidden bg-black py-16 text-white sm:py-20 lg:py-28"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#deb575]/[0.05] blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1650px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-12 xl:gap-20 xl:px-16">
        {/* Left: Overlapping Photo Collage */}
        <div className="relative mx-auto w-full max-w-[800px] lg:max-w-none">
          <div className="relative aspect-[1.12/1] w-full sm:aspect-[1.2/1] lg:aspect-[1.08/1]">
            {storyImages.map((image) => (
              <div
                key={image.src}
                className={`absolute overflow-hidden border-[3px] border-[#f4e8d0] bg-[#17130e] shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:z-40 hover:scale-[1.03] sm:border-4 ${image.position}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 70vw, 40vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Story Content */}
        <div className="relative z-40 mx-auto w-full max-w-[650px] lg:mx-0">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#deb575] sm:text-sm">
            Our Story
          </p>

          <h2 className="font-serif text-4xl leading-[1.12] sm:text-5xl lg:text-[54px] xl:text-[64px]">
            A Journey
            <br />
            Driven by{" "}
            <span className="text-[#deb575]">Passion</span>
          </h2>

          <div className="mt-7 space-y-5 text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
            <p>
              Photography has always been more than just a profession for
              me — it&apos;s a passion, a way to see the world, and a way
              to tell stories. What started as a love for capturing moments
              slowly turned into a full-time journey, allowing me to be
              part of people&apos;s most important milestones.
            </p>

            <p>
              Over the years, I have had the privilege of working with
              wonderful clients, witnessing beautiful stories, and creating
              memories that last a lifetime. Every click is driven by a
              deep passion for detail, a love for real emotions, and a
              commitment to deliver timeless images.
            </p>
          </div>

          {/* Decorative Signature Line */}
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-16 bg-[#deb575]" />
            <span className="font-serif text-lg italic text-[#deb575]">
              Every frame tells a story
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
