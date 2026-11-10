"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Home,
  Images,
  MessageSquareQuote,
  Mail,
  ArrowUpRight,
  RefreshCw,
  CalendarDays,
  Clock3,
  AlertCircle,
  Layers,
  UserRound,
  CheckCircle2,
  CircleAlert,
  Sparkles,
  Settings2,
  LayoutDashboard,
  Camera,
  ChevronRight,
} from "lucide-react";

import { getHomepageContent } from "@/services/api/homepage.api";
import { getAboutData } from "@/services/api/about.api";
import { getServicesData } from "@/services/api/services.api";
import { getGalleryData } from "@/services/api/gallery.api";
import { getTestimonialsData } from "@/services/api/testimonials.api";
import { getAllContactEnquiries } from "@/services/api/contact-enquiries.api";
import { getWebsiteSettings } from "@/services/api/settings.api";
import type { ContactEnquiry } from "@/services/api/contact-enquiries.api";

interface DashboardStats {
  gallery: number;
  services: number;
  enquiries: number;
  testimonials: number;
}

interface ContentStatus {
  name: string;
  completed: boolean;
}

const initialStats: DashboardStats = {
  gallery: 0,
  services: 0,
  enquiries: 0,
  testimonials: 0,
};

const formatDate = (date: string) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatStatus = (status: string) =>
  status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getStatusStyle = (status: string) => {
  switch (status) {
    case "new":
      return "border-sky-400/20 bg-sky-400/10 text-sky-300";
    case "contacted":
      return "border-violet-400/20 bg-violet-400/10 text-violet-300";
    case "in-progress":
      return "border-amber-400/20 bg-amber-400/10 text-amber-300";
    case "completed":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
    case "cancelled":
      return "border-rose-400/20 bg-rose-400/10 text-rose-300";
    default:
      return "border-white/10 bg-white/5 text-white/60";
  }
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [recentEnquiries, setRecentEnquiries] = useState<ContactEnquiry[]>([]);
  const [contentStatus, setContentStatus] = useState<ContentStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardData = useCallback(async () => {
    const token =
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken");

    if (!token) {
      setError("Admin authentication required. Please login again.");
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      setError("");

      const results = await Promise.allSettled([
        getHomepageContent(),
        getAboutData(),
        getServicesData(),
        getGalleryData(),
        getTestimonialsData(),
        getAllContactEnquiries(token),
        getWebsiteSettings(),
      ]);

      const [
        homepageResult,
        aboutResult,
        servicesResult,
        galleryResult,
        testimonialsResult,
        enquiriesResult,
        settingsResult,
      ] = results;

      const newStats: DashboardStats = { ...initialStats };
      const failures: string[] = [];
      const newContentStatus: ContentStatus[] = [];

      // Homepage
      if (homepageResult.status === "fulfilled") {
        newContentStatus.push({
          name: "Homepage Content",
          completed: Boolean(
            homepageResult.value.success && homepageResult.value.data
          ),
        });
      } else {
        failures.push("Homepage");
        newContentStatus.push({
          name: "Homepage Content",
          completed: false,
        });
      }

      // About
      if (aboutResult.status === "fulfilled") {
        newContentStatus.push({
          name: "About Section",
          completed: Boolean(
            aboutResult.value.success && aboutResult.value.data
          ),
        });
      } else {
        failures.push("About");
        newContentStatus.push({
          name: "About Section",
          completed: false,
        });
      }

      // Services
      if (servicesResult.status === "fulfilled") {
        const services = servicesResult.value.data.services.items || [];

        newStats.services = services.filter(
          (item) => item.isActive
        ).length;

        newContentStatus.push({
          name: "Services",
          completed: services.length > 0,
        });
      } else {
        failures.push("Services");
        newContentStatus.push({
          name: "Services",
          completed: false,
        });
      }

      // Gallery
      if (galleryResult.status === "fulfilled") {
        const photos = galleryResult.value.data.collections.photos || [];

        newStats.gallery = photos.filter(
          (photo) => photo.isActive
        ).length;

        newContentStatus.push({
          name: "Gallery",
          completed: photos.length > 0,
        });
      } else {
        failures.push("Gallery");
        newContentStatus.push({
          name: "Gallery",
          completed: false,
        });
      }

      // Testimonials
      if (testimonialsResult.status === "fulfilled") {
        const testimonials =
          testimonialsResult.value.data.reviewsSection.testimonials || [];

        newStats.testimonials = testimonials.filter(
          (item) => item.isActive
        ).length;

        newContentStatus.push({
          name: "Testimonials",
          completed: testimonials.length > 0,
        });
      } else {
        failures.push("Testimonials");
        newContentStatus.push({
          name: "Testimonials",
          completed: false,
        });
      }

      // Contact Enquiries
      if (enquiriesResult.status === "fulfilled") {
        newStats.enquiries = enquiriesResult.value.count;

        const sorted = [...enquiriesResult.value.data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

        setRecentEnquiries(sorted.slice(0, 5));

        newContentStatus.push({
          name: "Contact Information",
          completed: true,
        });
      } else {
        failures.push("Contact Enquiries");
        setRecentEnquiries([]);

        newContentStatus.push({
          name: "Contact Information",
          completed: false,
        });
      }

      // Website Settings
      if (settingsResult.status === "fulfilled") {
        newContentStatus.push({
          name: "Website Settings",
          completed: Boolean(
            settingsResult.value.success && settingsResult.value.settings
          ),
        });
      } else {
        failures.push("Website Settings");

        newContentStatus.push({
          name: "Website Settings",
          completed: false,
        });
      }

      setStats(newStats);
      setContentStatus(newContentStatus);

      if (failures.length > 0) {
        setError(
          `Some sections could not be loaded: ${failures.join(
            ", "
          )}. Please refresh.`
        );
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError("Your session has expired. Please login again.");
      } else {
        setError("Unable to load dashboard data. Please try again.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
  };

  const completedSections = contentStatus.filter(
    (item) => item.completed
  ).length;

  const completionPercentage =
    contentStatus.length > 0
      ? Math.round((completedSections / contentStatus.length) * 100)
      : 0;

  // Statistics Cards
  const statCards = [
    {
      title: "Gallery Items",
      value: stats.gallery,
      note: "Active photographs",
      icon: Images,
      accent: "text-[#d8b574]",
      iconBg: "bg-[#c6a15c]/10",
      border: "border-[#c6a15c]/20",
    },
    {
      title: "Services",
      value: stats.services,
      note: "Active services",
      icon: Layers,
      accent: "text-sky-300",
      iconBg: "bg-sky-400/10",
      border: "border-sky-400/15",
    },
    {
      title: "Total Enquiries",
      value: stats.enquiries,
      note: "Client messages received",
      icon: Mail,
      accent: "text-emerald-300",
      iconBg: "bg-emerald-400/10",
      border: "border-emerald-400/15",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      note: "Published client reviews",
      icon: MessageSquareQuote,
      accent: "text-violet-300",
      iconBg: "bg-violet-400/10",
      border: "border-violet-400/15",
    },
  ];

  // Quick Actions
  const quickActions = [
    {
      title: "Add Gallery Image",
      description: "Upload new photography",
      href: "/admin/gallery",
      icon: Images,
    },
    {
      title: "Manage Services",
      description: "Edit your services",
      href: "/admin/services",
      icon: Layers,
    },
    {
      title: "Edit Homepage",
      description: "Update landing content",
      href: "/admin/homepage",
      icon: Home,
    },
    {
      title: "Update About",
      description: "Manage your profile",
      href: "/admin/about",
      icon: UserRound,
    },
    {
      title: "Testimonials",
      description: "Manage client reviews",
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
    },
    {
      title: "View Enquiries",
      description: "Respond to clients",
      href: "/admin/contact-enquiries",
      icon: Mail,
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0b0b] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8 lg:py-9 xl:px-10">
      <div className="mx-auto w-full max-w-[1700px]">

        {/* Dashboard Header */}
        <header className="mb-8 flex flex-col gap-6 border-b border-white/[0.08] pb-7 lg:mb-10 lg:flex-row lg:items-center lg:justify-between lg:pb-9">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c6a15c]/20 bg-[#c6a15c]/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d8b574] sm:text-xs">
              <Sparkles size={13} />
              Control Center
            </div>

            <h1 className="font-serif text-4xl font-semibold tracking-tight text-white sm:text-5xl xl:text-6xl">
              Dashboard
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base sm:leading-7">
              Welcome back, Naeem. Here is an overview of your photography
              website and the latest client activity.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:justify-end">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c6a15c]/30 bg-[#c6a15c]/10 font-serif text-base font-semibold text-[#e3c58e]">
                NB
              </div>

              <div>
                <p className="text-sm font-semibold text-white sm:text-base">
                  Naeem Bhojani
                </p>
                <p className="mt-0.5 text-xs text-white/45">
                  Super Admin
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-2xl border border-[#c6a15c]/30 bg-[#c6a15c] px-5 py-3 text-sm font-semibold text-[#17130c] shadow-[0_8px_30px_rgba(198,161,92,0.12)] transition hover:bg-[#dfbd7b] disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            >
              <RefreshCw
                size={17}
                className={refreshing ? "animate-spin" : ""}
              />
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <div className="mb-7 flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/[0.08] p-4 text-sm leading-6 text-rose-200 sm:p-5 sm:text-base">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Statistics */}
        <section className="mb-9">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c6a15c] sm:text-sm">
                At a glance
              </p>

              <h2 className="mt-1.5 text-2xl font-semibold text-white sm:text-3xl">
                Website Overview
              </h2>
            </div>

            <span className="hidden text-sm text-white/35 sm:block">
              Live data from your website
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {statCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className={`group relative overflow-hidden rounded-3xl border ${card.border} bg-gradient-to-br from-[#1b1a18] via-[#151515] to-[#111] p-5 shadow-[0_15px_45px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[#c6a15c]/40 hover:shadow-[0_18px_50px_rgba(0,0,0,0.3)] sm:p-6 xl:p-7`}
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/[0.025] blur-2xl transition group-hover:bg-[#c6a15c]/[0.07]" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white/55 sm:text-base">
                        {card.title}
                      </p>

                      <p className="mt-4 text-4xl font-semibold tracking-tight text-white tabular-nums sm:text-5xl">
                        {loading ? (
                          <span className="inline-block h-11 w-16 animate-pulse rounded-lg bg-white/10" />
                        ) : (
                          card.value.toLocaleString("en-IN")
                        )}
                      </p>

                      <p className="mt-3 text-xs text-white/35 sm:text-sm">
                        {card.note}
                      </p>
                    </div>

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.iconBg} sm:h-14 sm:w-14`}
                    >
                      <Icon
                        size={25}
                        strokeWidth={1.7}
                        className={card.accent}
                      />
                    </div>
                  </div>

                  <div className="mt-6 h-px w-full bg-gradient-to-r from-white/10 via-white/[0.04] to-transparent" />

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-[0.13em] text-white/30">
                      Overview metric
                    </span>

                    <span className="text-xs text-[#c6a15c]/70">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-9 rounded-3xl border border-[#c6a15c]/15 bg-gradient-to-br from-[#1b1915] via-[#151515] to-[#111] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.2)] sm:p-7 lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-[#d8b574]">
                <LayoutDashboard size={17} />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm">
                  Shortcuts
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Quick Actions
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/45 sm:text-base">
                Everything you need to manage your photography website.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex min-h-[138px] items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition duration-300 hover:border-[#c6a15c]/35 hover:bg-[#c6a15c]/[0.07] sm:min-h-[158px] sm:flex-col sm:items-start sm:justify-between sm:p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#c6a15c]/20 bg-[#c6a15c]/[0.08] text-[#d8b574] transition group-hover:scale-105 group-hover:bg-[#c6a15c]/15 sm:h-14 sm:w-14">
                    <Icon size={25} strokeWidth={1.6} />
                  </div>

                  <div className="min-w-0 flex-1 sm:w-full">
                    <p className="text-sm font-semibold text-white sm:text-base">
                      {action.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/40 sm:text-sm">
                      {action.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={18}
                    className="shrink-0 text-white/25 transition group-hover:translate-x-1 group-hover:text-[#d8b574] sm:hidden"
                  />

                  <ArrowUpRight
                    size={17}
                    className="hidden self-end text-white/25 transition group-hover:text-[#d8b574] sm:block"
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent Enquiries + Content Status */}
        <section className="grid grid-cols-1 items-start gap-6 2xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,1fr)]">

          {/* Recent Enquiries */}
          <div className="min-w-0 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#191919] to-[#111] shadow-[0_18px_55px_rgba(0,0,0,0.2)]">
            <div className="flex flex-col gap-4 border-b border-white/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <div className="flex items-center gap-2 text-[#d8b574]">
                  <Mail size={17} />

                  <span className="text-xs font-semibold uppercase tracking-[0.17em]">
                    Client activity
                  </span>
                </div>

                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Recent Enquiries
                </h2>

                <p className="mt-1.5 text-sm text-white/40 sm:text-base">
                  The latest messages from your clients.
                </p>
              </div>

              <Link
                href="/admin/contact-enquiries"
                className="inline-flex min-h-[44px] w-fit items-center justify-center gap-2 rounded-xl border border-[#c6a15c]/25 px-4 py-2.5 text-sm font-semibold text-[#d8b574] transition hover:bg-[#c6a15c]/10"
              >
                View All Enquiries
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4 p-5 sm:p-7">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-[76px] animate-pulse rounded-2xl bg-white/[0.05]"
                  />
                ))}
              </div>
            ) : recentEnquiries.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center sm:py-20">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#c6a15c]/20 bg-[#c6a15c]/[0.08] text-[#d8b574]">
                  <Mail size={28} strokeWidth={1.5} />
                </div>

                <p className="text-lg font-semibold text-white">
                  No enquiries yet
                </p>

                <p className="mt-2 max-w-sm text-sm leading-6 text-white/40">
                  New client enquiries will appear here when someone contacts
                  you through your website.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop and Tablet Table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[680px] text-left">
                    <thead>
                      <tr className="bg-white/[0.025] text-xs uppercase tracking-[0.14em] text-white/35">
                        <th className="px-6 py-5 font-semibold">Client</th>
                        <th className="px-6 py-5 font-semibold">Email</th>
                        <th className="px-6 py-5 font-semibold">Event</th>
                        <th className="px-6 py-5 font-semibold">Date</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-white/[0.055]">
                      {recentEnquiries.map((enquiry) => (
                        <tr
                          key={enquiry._id}
                          className="transition hover:bg-white/[0.025]"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c6a15c]/20 bg-[#c6a15c]/10 text-sm font-semibold text-[#e3c58e]">
                                {enquiry.name
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </div>

                              <div className="min-w-0">
                                <p className="whitespace-nowrap text-sm font-semibold text-white">
                                  {enquiry.name}
                                </p>

                                <span
                                  className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${getStatusStyle(
                                    enquiry.status
                                  )}`}
                                >
                                  {formatStatus(enquiry.status)}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="max-w-[210px] truncate px-6 py-5 text-sm text-white/50">
                            {enquiry.email}
                          </td>

                          <td className="px-6 py-5 text-sm text-white/70">
                            {enquiry.eventType}
                          </td>

                          <td className="whitespace-nowrap px-6 py-5 text-sm text-white/45">
                            {formatDate(enquiry.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Enquiry Cards */}
                <div className="space-y-3 p-4 md:hidden">
                  {recentEnquiries.map((enquiry) => (
                    <div
                      key={enquiry._id}
                      className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c6a15c]/20 bg-[#c6a15c]/10 text-sm font-semibold text-[#e3c58e]">
                            {enquiry.name.charAt(0).toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-base font-semibold text-white">
                              {enquiry.name}
                            </p>

                            <p className="mt-1 break-all text-xs text-white/40">
                              {enquiry.email}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium ${getStatusStyle(
                            enquiry.status
                          )}`}
                        >
                          {formatStatus(enquiry.status)}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-3">
                        <span className="text-sm font-medium text-white/70">
                          {enquiry.eventType}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                          <CalendarDays size={13} />
                          {formatDate(enquiry.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Website Content Status */}
          <div className="rounded-3xl border border-[#c6a15c]/15 bg-gradient-to-br from-[#1b1915] via-[#151515] to-[#111] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.2)] sm:p-7">
            <div className="flex items-center gap-2 text-[#d8b574]">
              <Settings2 size={17} />

              <span className="text-xs font-semibold uppercase tracking-[0.17em]">
                Website health
              </span>
            </div>

            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Content Status
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-white/40 sm:text-base">
              Keep every important section of your website up to date.
            </p>

            <div className="my-7 flex flex-col items-center gap-6 rounded-2xl border border-white/[0.06] bg-black/20 p-5 sm:flex-row sm:justify-center sm:gap-8 sm:p-6">
              <div
                className="relative flex h-40 w-40 shrink-0 items-center justify-center rounded-full sm:h-44 sm:w-44"
                style={{
                  background: `conic-gradient(#d8b574 ${
                    completionPercentage * 3.6
                  }deg, #302b22 0deg)`,
                }}
              >
                <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full border border-white/[0.06] bg-[#151515]">
                  <span className="font-serif text-4xl font-semibold text-white sm:text-5xl">
                    {loading ? "--" : `${completionPercentage}%`}
                  </span>

                  <span className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                    Completed
                  </span>
                </div>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-2xl font-semibold text-white">
                  {loading
                    ? "--"
                    : `${completedSections} of ${contentStatus.length}`}
                </p>

                <p className="mt-1 text-sm text-white/40">
                  Website sections ready
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#c6a15c]/20 bg-[#c6a15c]/[0.07] px-3 py-1.5 text-xs font-medium text-[#d8b574]">
                  <Sparkles size={13} />
                  Content overview
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {contentStatus.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition hover:bg-white/[0.035] sm:px-4"
                >
                  <span className="text-sm font-medium text-white/75 sm:text-base">
                    {item.name}
                  </span>

                  {loading ? (
                    <span className="h-5 w-20 animate-pulse rounded-full bg-white/10" />
                  ) : item.completed ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300 sm:text-sm">
                      <CheckCircle2 size={16} />
                      Complete
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 sm:text-sm">
                      <CircleAlert size={16} />
                      Pending
                    </span>
                  )}
                </div>
              ))}

              {!loading && contentStatus.length === 0 && (
                <p className="py-5 text-center text-sm text-white/40">
                  Content status is not available.
                </p>
              )}
            </div>

            <Link
              href="/admin/settings"
              className="mt-6 flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-[#c6a15c]/25 bg-[#c6a15c]/[0.07] px-4 py-3 text-sm font-semibold text-[#d8b574] transition hover:bg-[#c6a15c]/[0.13] sm:text-base"
            >
              Manage Website Settings
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs tracking-wide text-white/30 sm:text-sm">
            © 2026 Naeem Bhojani Photography. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-xs text-white/30 sm:text-sm">
            <Camera size={14} className="text-[#c6a15c]/70" />
            <span>Admin Dashboard</span>
            <span className="text-white/15">•</span>
            <Clock3 size={14} />
            <span>Management Portal</span>
          </p>
        </footer>
      </div>
    </main>
  );
}