
import Image from "next/image";
import type {
  GallerySignatureFeature as GallerySignatureFeatureData,
} from "@/types/gallery.types";

interface GallerySignatureFeatureProps {
  data: GallerySignatureFeatureData;
}

function HighlightIcon({
  name,
}: {
  name: GallerySignatureFeatureData["highlights"][number]["icon"];
}) {
  const common = {
    className: "h-7 w-7",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "camera":
      return (
        <svg {...common}>
          <path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );

    case "layers":
      return (
        <svg {...common}>
          <path d="m12 2 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
        </svg>
      );

    case "play":
      return (
        <svg
          {...common}
          fill="currentColor"
          stroke="none"
        >
          <circle cx="12" cy="12" r="9" opacity=".2" />
          <path d="m10 8 6 4-6 4V8Z" />
        </svg>
      );

    case "heart":
      return (
        <svg {...common}>
          <path d="M20.8 8.8c0 5-8.8 11-8.8 11s-8.8-6-8.8-11A4.8 4.8 0 0 1 12 6.3a4.8 4.8 0 0 1 8.8 2.5Z" />
        </svg>
      );

    default:
      return null;
  }
}

export default function GallerySignatureFeature({
  data,
}: GallerySignatureFeatureProps) {
  if (!data || !data.isActive) return null;

  const backgroundImage =
    data.backgroundImage ||
    "/images/gallery-signature-bg.png";

  const highlights = [...(data.highlights || [])]
    .filter((item) => item.isActive)
    .sort((a, b) => a.order - b.order);

  const showExploreButton =
    data.exploreButton?.isActive &&
    data.exploreButton.label &&
    data.exploreButton.href;

  const showReelButton =
    data.reelButton?.isActive &&
    data.reelButton.label &&
    data.reelButton.href;

  return (
    <section className="relative isolate w-full overflow-hidden border-y border-[#d4a74d]/30 bg-[#090806] text-white">

      {/* Composite Background Image */}
      <div className="absolute inset-0 -z-30">
        <Image
          src={backgroundImage}
          alt={data.backgroundImageAlt || ""}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 -z-20 bg-black/35" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#080706]/95 via-[#080706]/85 via-45% to-[#080706]/15" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#080706]/45 via-transparent to-[#080706]/25" />

      {/* Main Content */}
      <div className="mx-auto flex min-h-[650px] w-full max-w-[1600px] items-center px-6 py-24 sm:px-10 lg:min-h-[760px] lg:px-[8.5%] lg:py-28">

        <div className="w-full max-w-[660px]">

          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-[#e9b95f]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#edc16f] sm:text-xs sm:tracking-[0.38em]">
              {data.eyebrow}
            </span>

            <span className="h-px w-10 bg-[#e9b95f]" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-[clamp(3rem,6.3vw,5.8rem)] font-normal leading-[0.98] tracking-[-0.045em] text-[#fffaf2]">
            {data.heading}

            <span className="mt-1 block italic text-[#eabd70]">
              {data.highlightedText}
            </span>
          </h2>

          {/* Gold underline */}
          <div className="mt-7 h-[2px] w-24 bg-gradient-to-r from-[#f3cc7e] to-transparent" />

          {/* Description */}
          <p className="mt-7 max-w-[540px] text-sm font-light leading-8 text-white/80 sm:text-base sm:leading-9">
            {data.description}
          </p>

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-0">
              {highlights.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className={`flex flex-col items-center text-center sm:px-4 ${
                    index !== 0
                      ? "sm:border-l sm:border-[#d7ad60]/35"
                      : ""
                  }`}
                >
                  <div className="text-[#e9b95f] transition-transform duration-300 hover:-translate-y-1">
                    <HighlightIcon name={item.icon} />
                  </div>

                  <p className="mt-3 text-sm font-medium text-white sm:text-base">
                    {item.title}
                  </p>

                  <p className="text-sm font-light text-white/75">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          {(showExploreButton || showReelButton) && (
            <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5">

              {showExploreButton && (
                <a
                  href={data.exploreButton.href}
                  className="group inline-flex min-h-[56px] items-center justify-center gap-5 rounded-full border border-[#f0c778] bg-[#edbd68] px-8 text-xs font-bold tracking-wide text-[#17110a] shadow-[0_8px_35px_rgba(237,189,104,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ffda96] hover:shadow-[0_12px_40px_rgba(237,189,104,0.25)]"
                >
                  {data.exploreButton.label}

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
              )}

              {showReelButton && (
                <a
                  href={data.reelButton.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:text-[#edbd68]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#edbd68]/80 text-[#edbd68] transition-all duration-300 group-hover:bg-[#edbd68] group-hover:text-black">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-0.5 h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>

                  {data.reelButton.label}
                </a>
              )}

            </div>
          )}

        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#eac17b]/70 to-transparent" />

    </section>
  );
}
