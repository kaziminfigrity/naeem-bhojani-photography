
import {
  Camera,
  UsersRound,
  Trophy,
  Heart,
  Star,
  Award,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react";

import type { AchievementStat } from "@/types/about.types";

interface AchievementStatsProps {
  data: AchievementStat[];
}

const iconMap: Record<string, LucideIcon> = {
  camera: Camera,
  "users-round": UsersRound,
  trophy: Trophy,
  heart: Heart,
  star: Star,
  award: Award,
  image: ImageIcon,
};

const defaultAchievements = [
  { value: "500+", label: "Projects Completed", icon: "camera" },
  { value: "300+", label: "Happy Clients", icon: "users-round" },
  { value: "10+", label: "Years of Experience", icon: "trophy" },
  { value: "100%", label: "Client Satisfaction", icon: "heart" },
];

export default function AchievementStats({
  data,
}: AchievementStatsProps) {
  const achievements =
    data?.length > 0
      ? [...data]
          .filter((item) => item.isActive)
          .sort((a, b) => a.order - b.order)
      : defaultAchievements;

  return (
    <section className="relative overflow-hidden bg-black py-8 text-white sm:py-10 lg:py-14">
      {/* Subtle gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-[#d6b477]/[0.04] blur-[90px]" />

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-2 px-3 sm:px-6 lg:grid-cols-4 lg:px-10">
        {achievements.map(({ value, label, icon }, index) => {
          const Icon = iconMap[icon?.toLowerCase()] || Star;

          return (
            <div
              key={`${label}-${index}`}
              className={`flex min-w-0 items-center justify-center gap-2.5 px-2 py-5 sm:gap-3 sm:px-4 sm:py-6 lg:gap-4 lg:px-5 lg:py-4 ${
                index % 2 === 1
                  ? "border-l border-[#d6b477]/20"
                  : ""
              } ${
                index >= 2
                  ? "border-t border-[#d6b477]/20 lg:border-t-0"
                  : ""
              } ${
                index === 2
                  ? "lg:border-l lg:border-[#d6b477]/20"
                  : ""
              }`}
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className="h-6 w-6 shrink-0 text-[#e7b968] sm:h-8 sm:w-8 lg:h-10 lg:w-10"
              />

              <div className="min-w-0">
                <p className="whitespace-nowrap font-sans text-xl font-bold leading-tight tracking-tight text-[#e7b968] sm:text-3xl lg:text-4xl">
                  {value}
                </p>

                <p className="mt-1 max-w-[130px] text-[10px] leading-4 text-white/75 sm:max-w-none sm:text-xs sm:leading-5 lg:text-sm">
                  {label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
