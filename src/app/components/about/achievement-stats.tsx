
import {
  Camera,
  UsersRound,
  Trophy,
  Heart,
} from "lucide-react";

const achievements = [
  {
    value: "500+",
    label: "Projects Completed",
    Icon: Camera,
  },
  {
    value: "300+",
    label: "Happy Clients",
    Icon: UsersRound,
  },
  {
    value: "10+",
    label: "Years of Experience",
    Icon: Trophy,
  },
  {
    value: "100%",
    label: "Client Satisfaction",
    Icon: Heart,
  },
];

export default function AchievementStats() {
  return (
    <section className="relative overflow-hidden bg-black py-12 text-white sm:py-14 lg:py-16">
      {/* Subtle gold background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-[#d6b477]/[0.04] blur-[90px]" />

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-0 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {achievements.map(({ value, label, Icon }, index) => (
          <div
            key={label}
            className={`flex items-center justify-center gap-4 px-4 py-6 sm:px-6 lg:py-3 xl:gap-5 ${
              index !== 0
                ? "border-t border-[#d6b477]/20 sm:border-t-0"
                : ""
            } ${
              index % 2 !== 0
                ? "sm:border-l sm:border-[#d6b477]/20"
                : ""
            } ${
              index >= 2
                ? "lg:border-l lg:border-[#d6b477]/20"
                : ""
            }`}
          >
            {/* Gold Icon */}
            <Icon
              aria-hidden="true"
              strokeWidth={1.5}
              className="h-9 w-9 shrink-0 text-[#e7b968] sm:h-10 sm:w-10 lg:h-11 lg:w-11"
            />

            {/* Statistic */}
            <div className="min-w-0">
              <p className="font-sans text-3xl font-bold leading-none tracking-tight text-[#e7b968] sm:text-4xl">
                {value}
              </p>

              <p className="mt-2 text-xs leading-5 text-white/80 sm:text-sm">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
