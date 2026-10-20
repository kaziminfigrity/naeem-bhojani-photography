
const steps = [
  {
    number: "01",
    eyebrow: "THE CONVERSATION",
    title: "Tell Us Your Story",
    description:
      "Every unforgettable photograph begins with a conversation. We listen to your vision, understand your style, and discover what matters most to you.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
        <path
          d="M8 11a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v17a5 5 0 0 1-5 5H22L12 40v-7h-1a3 3 0 0 1-3-3V11Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="19" cy="17" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M13 27c.8-4 2.8-6 6-6 2.1 0 3.6.9 4.5 2.5M28 16h6m-3-3v6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    eyebrow: "THE PREPARATION",
    title: "Every Detail, Planned",
    description:
      "From location and lighting to the smallest personal touches, we thoughtfully prepare every detail to make your session feel effortless.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
        <path
          d="M12 6h17l8 8v28H12V6Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M29 6v9h8M18 22h13M18 28h13M18 34h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="34" cy="35" r="5" fill="#f7f1e7" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="m34 32.5 1 1.7 2 .3-1.5 1.4.4 2-1.9-1-1.8 1 .3-2-1.5-1.4 2-.3 1-1.7Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    number: "03",
    eyebrow: "THE ART OF CAPTURE",
    title: "Moments, Made Timeless",
    description:
      "When the moment arrives, we capture the genuine emotions, beautiful details, and spontaneous memories that make your story uniquely yours.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
        <path
          d="M7 17v-5a4 4 0 0 1 4-4h5m16 0h5a4 4 0 0 1 4 4v5M7 31v5a4 4 0 0 0 4 4h5m16 0h5a4 4 0 0 0 4-4v-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 17h24a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V20a3 3 0 0 1 3-3Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="24" cy="25.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="m17 17 2-4h10l2 4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    number: "04",
    eyebrow: "THE FINAL CHAPTER",
    title: "Memories to Keep Forever",
    description:
      "Each selected photograph is carefully refined and beautifully presented, ready for you to relive, share, and treasure for years to come.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7">
        <rect
          x="7"
          y="12"
          width="34"
          height="29"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M13 12V8a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v4"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="18" cy="21" r="2" fill="currentColor" />
        <path
          d="m11 35 10-10 6 6 4-4 6 8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f8f5ee] text-[#171611]">
      {/* Decorative editorial details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 -z-10 h-[430px] w-[430px] rounded-full border border-[#b28a48]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 -z-10 h-[280px] w-[280px] rounded-full border border-[#b28a48]/10"
      />

      <div className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        {/* Section intro */}
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#b38a43]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a47a35] sm:text-xs">
                A Thoughtful Process
              </span>
            </div>

            <h2 className="max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
              From Your
              <br />
              <span className="italic text-[#ad813b]">Vision</span> to
              <br />
              Forever.
            </h2>
          </div>

          <div className="max-w-lg pb-1 lg:justify-self-end">
            <p className="text-base leading-7 text-[#68645c] sm:text-lg sm:leading-8">
              Great photography is more than a beautiful image. It is a
              thoughtful experience, built around your story and finished with
              care in every detail.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#b38a43]" />
              <span className="font-serif text-sm italic text-[#8c744e]">
                Your moments. Our perspective.
              </span>
            </div>
          </div>
        </div>

        {/* Fine divider */}
        <div className="mb-12 mt-12 h-px bg-[#ded5c5] sm:mb-16 sm:mt-16" />

        {/* Four-step editorial timeline */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`group relative flex flex-col border-[#ded5c5] py-7 sm:px-6 sm:py-8 lg:min-h-[370px] lg:px-7 lg:py-3 ${
                index % 2 === 0 ? "sm:border-r lg:border-r" : ""
              } ${
                index >= 2 ? "lg:border-t-0" : ""
              } ${
                index < 2 ? "lg:border-r" : ""
              } ${
                index === 0 ? "sm:pl-0 lg:pl-0" : ""
              } ${
                index === 3 ? "sm:pr-0 lg:pr-0" : ""
              } ${
                index < 2 ? "sm:border-b lg:border-b-0" : ""
              }`}
            >
              {/* Number and icon */}
              <div className="flex items-center justify-between">
                <span className="font-serif text-[54px] leading-none tracking-[-0.06em] text-[#e1d5c0] transition-colors duration-300 group-hover:text-[#b38a43]/55 sm:text-[62px]">
                  {step.number}
                </span>

                <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#d8c5a4] text-[#a77a31] transition-all duration-300 group-hover:border-[#ad813b] group-hover:bg-[#ad813b] group-hover:text-white">
                  {step.icon}
                </div>
              </div>

              {/* Step information */}
              <div className="mt-8">
                <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#a47a35] sm:text-[10px]">
                  {step.eyebrow}
                </p>

                <h3 className="max-w-[260px] font-serif text-[25px] leading-[1.12] tracking-[-0.025em] sm:text-[27px]">
                  {step.title}
                </h3>

                <p className="mt-4 max-w-[290px] text-sm leading-[1.85] text-[#706b62]">
                  {step.description}
                </p>
              </div>

              {/* Bottom accent */}
              <div className="mt-7 h-px w-10 bg-[#bd9654] transition-all duration-300 group-hover:w-20" />
            </article>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-14 flex flex-col items-center border-t border-[#ded5c5] pt-9 text-center sm:mt-16 sm:pt-11">
          <p className="font-serif text-2xl italic text-[#8c744e] sm:text-3xl">
            Every detail tells a story.
          </p>
          <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.24em] text-[#8a8479] sm:text-[10px]">
            Thoughtfully planned · Beautifully captured · Carefully delivered
          </p>
        </div>
      </div>
    </section>
  );
}
