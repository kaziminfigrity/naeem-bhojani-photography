"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllContactEnquiries } from "@/services/api/contact-enquiries.api";

import {
  Home,
  Layers,
  UserRound,
  LayoutGrid,
  Image as GalleryIcon,
  Quote,
  Mail,
  ContactRound,
  Settings,
  PanelTop,
  ChevronDown,
  X,
  LogOut,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Homepage", href: "/admin/homepage", icon: Layers, dropdown: true },
  { name: "About", href: "/admin/about", icon: UserRound },
  { name: "Services", href: "/admin/services", icon: LayoutGrid },
  { name: "Contact", href: "/admin/contact", icon: ContactRound },
  { name: "Gallery", href: "/admin/gallery", icon: GalleryIcon },
  { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
  {
    name: "Contact Enquiries",
    href: "/admin/contact-enquiries",
    icon: Mail,
  },
  {
    name: "Header & Footer",
    href: "/admin/header-footer",
    icon: PanelTop,
  },
  { name: "Website Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [newEnquiriesCount, setNewEnquiriesCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");

    onClose();
    router.replace("/admin/login");
  };

  useEffect(() => {
  let isMounted = true;

  const fetchNewEnquiriesCount = async () => {
    const token =
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken");

    if (!token) {
      setNewEnquiriesCount(0);
      return;
    }

    try {
      const response = await getAllContactEnquiries(token);

      if (isMounted && response.success && Array.isArray(response.data)) {
        const newCount = response.data.filter(
          (enquiry) => enquiry.status === "new"
        ).length;

        setNewEnquiriesCount(newCount);
      }
    } catch (error) {
      console.error("Failed to fetch new enquiries count:", error);
    }
  };

  fetchNewEnquiriesCount();

  // Refresh count every 30 seconds
  const interval = setInterval(fetchNewEnquiriesCount, 30000);

  return () => {
    isMounted = false;
    clearInterval(interval);
  };
}, [pathname]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 z-50 flex flex-col overflow-hidden border-r border-[#b18a4a]/20 bg-[#0d0c0a] text-white shadow-2xl shadow-black/40 transition-all duration-300 ease-in-out
          top-16 h-[calc(100dvh-4rem)] w-full
          ${isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible pointer-events-none"}
          lg:inset-y-0 lg:top-0 lg:h-dvh lg:w-[270px]
          lg:translate-y-0 lg:opacity-100 lg:visible lg:pointer-events-auto`}
      >
        {/* Camera Background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[210px] lg:h-[250px]">
          <Image
            src="/images/admin-sidebar-camera.png"
            alt=""
            fill
            sizes="270px"
            priority
            className="object-cover object-bottom"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0c0a] via-[#0d0c0a]/65 to-[#0d0c0a]/25" />
        </div>

        {/* Sidebar Content */}
        <div className="relative z-10 flex h-full min-h-0 flex-col">
          {/* Brand Header */}
          <div className="relative flex shrink-0 flex-col items-center border-b border-white/10 px-4 pb-2 pt-2 lg:pb-5 lg:pt-5">
            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="absolute right-4 top-3 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
            >
              <X size={19} />
            </button>

            <Link
              href="/admin/dashboard"
              onClick={onClose}
              className="flex flex-col items-center"
            >
              <Image
                src="/Naeem%20Bhojani-logo.png"
                alt="Naeem Bhojani Photography"
                width={220}
                height={120}
                priority
                className="h-[55px] w-[155px] object-contain lg:h-[82px] lg:w-[185px]"
              />

              {/* Admin Badge */}
              <div className="mt-1.5 rounded-full border border-[#b18a4a]/70 bg-[#b18a4a]/10 px-5 py-[3px] lg:mt-3 lg:py-1">
                <span className="text-[9px] font-semibold tracking-[2px] text-[#d5ad62]">
                  ADMIN PANEL
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Heading */}
          <div className="shrink-0 px-5 pb-1 pt-2.5 lg:pb-2 lg:pt-6">
            <p className="text-[9px] font-semibold uppercase tracking-[2.5px] text-[#b8a88c]/55 lg:text-[10px]">
              Main Menu
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="min-h-0 flex-1 space-y-0.5 overflow-y-auto overscroll-contain px-3.5 pb-2 pt-1 lg:space-y-2 lg:pt-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex min-h-[37px] items-center justify-between rounded-lg px-3.5 transition-all duration-200 lg:min-h-[43px] ${
                    isActive
                      ? "border border-[#d1a44f]/30 bg-gradient-to-r from-[#a9823d] to-[#62491f] text-white shadow-lg shadow-black/20"
                      : "border border-transparent text-white/75 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      size={17}
                      strokeWidth={1.7}
                      className={
                        isActive
                          ? "text-white"
                          : "text-white/70 group-hover:text-[#d5ad62]"
                      }
                    />

                    <span
                      className={`text-[13px] lg:text-[14px] ${
                        isActive ? "font-semibold" : "font-medium"
                      }`}
                    >
                      {item.name}
                    </span>
                  </span>

                  {item.name === "Contact Enquiries" && newEnquiriesCount > 0 && (
                    <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-gradient-to-br from-[#d1a34d] to-[#956b2c] px-1 text-[9px] font-bold text-white lg:h-[21px] lg:min-w-[21px] lg:text-[10px]">
                      {newEnquiriesCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout Section */}
          <div className="shrink-0 border-t border-[#b18a4a]/20 bg-[#0d0c0a]/70 px-4 pb-2 pt-2 lg:pb-4 lg:pt-3">
            <button
              type="button"
              onClick={handleLogout}
              className="group flex w-full items-center justify-between rounded-lg border border-[#b18a4a]/25 bg-gradient-to-r from-[#b18a4a]/10 to-transparent px-3 py-2 transition hover:border-[#c69d52]/60 hover:from-[#b18a4a]/20 lg:px-4 lg:py-3"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#b18a4a]/30 bg-[#b18a4a]/10 text-[#d5ad62] lg:h-8 lg:w-8">
                  <LogOut size={16} />
                </span>

                <span className="text-[12px] font-semibold text-white/85 group-hover:text-[#e4c17f] lg:text-[13px]">
                  Logout
                </span>
              </span>

              <span className="text-[9px] tracking-wider text-white/30 group-hover:text-[#d5ad62]">
                EXIT
              </span>
            </button>

            <div className="mt-1.5 border-t border-white/10 pt-1.5 text-center lg:mt-3 lg:pt-3">
              <p className="text-[8px] font-medium tracking-[1px] text-white/40 lg:text-[9px]">
                © 2026 NAEEM BHOJANI
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
