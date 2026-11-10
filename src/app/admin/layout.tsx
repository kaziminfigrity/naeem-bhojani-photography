
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { getAdminProfile } from "@/services/api/admin.api";
import AdminSidebar from "./admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
  let isMounted = true;

  const verifyAdmin = async () => {
    if (isLoginPage) {
      setIsChecking(false);
      return;
    }

    const token =
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken");

    if (!token) {
      setIsChecking(false);
      router.replace("/admin/login");
      return;
    }

    try {
      const response = await getAdminProfile(token);

      if (!response.success || !response.admin) {
        throw new Error("Invalid admin session");
      }

      if (isMounted) {
        setIsAuthorized(true);
        setIsChecking(false);
      }
    } catch {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminUser");

      if (isMounted) {
        setIsAuthorized(false);
        setIsChecking(false);
        router.replace("/admin/login");
      }
    }
  };

  verifyAdmin();

  return () => {
    isMounted = false;
  };
}, [pathname, isLoginPage, router]);
  // Login page without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Check authentication before rendering admin pages
  if (isChecking || !isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#100e0c]">
        <div className="text-center">
          <div className="mx-auto size-10 animate-spin rounded-full border-2 border-[#b18a4a]/30 border-t-[#d5ad62]" />
          <p className="mt-4 text-sm tracking-wider text-[#d5ad62]">
            VERIFYING ADMIN ACCESS...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f5]">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-[#b18a4a]/20 bg-[#100e0c] px-5 shadow-md lg:hidden">
          <div className="flex flex-col">
            <p className="text-[13px] font-semibold tracking-[1.5px] text-white">
              NAEEM BHOJANI
            </p>

            <p className="mt-0.5 text-[9px] tracking-[2px] text-[#d5ad62]">
              ADMIN PANEL
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen((previous) => !previous)}
            aria-label="Toggle navigation menu"
            aria-expanded={sidebarOpen}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-[#b18a4a]/30 text-[#d5ad62] transition hover:bg-[#b18a4a]/10"
          >
            {sidebarOpen ? (
              <span className="text-xl">×</span>
            ) : (
              <Menu size={23} />
            )}
          </button>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
