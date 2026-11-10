
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";

import { loginAdmin } from "@/services/api/admin.api";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginAdmin({
        email: email.trim(),
        password,
      });

      if (response.success && response.token) {
        // Remove previously stored credentials
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        sessionStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminUser");

        // Remember Me: persistent storage
        // Otherwise: session-only storage
        const storage = rememberMe ? localStorage : sessionStorage;

        storage.setItem("adminToken", response.token);
        storage.setItem("adminUser", JSON.stringify(response.admin));

        // Redirect to admin dashboard
        router.push("/admin/dashboard");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Unable to login. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative grid min-h-screen overflow-hidden bg-[#100e0c] text-white lg:grid-cols-2">

      {/* LEFT BRANDING SECTION */}
      <section className="relative flex min-h-[620px] flex-col justify-between overflow-hidden border-r border-[#bd905c]/30 bg-[#211811] px-8 py-12 sm:px-14 lg:min-h-screen lg:px-16 lg:py-16">

        {/* DSLR BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/admin-login-bg.png')",
            backgroundPosition: "left center",
          }}
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/75" />

        {/* Additional Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/35" />

        {/* Decorative Background Shapes */}
        <div className="absolute -bottom-40 -left-24 size-[500px] rounded-full border border-[#c69a62]/15" />
        <div className="absolute -bottom-28 -left-12 size-[420px] rounded-full border border-[#c69a62]/10" />

        {/* BRAND LOGO */}
        <div className="relative z-10 mx-auto flex w-full max-w-[490px] flex-col items-center text-center">

          <Image
            src="/Naeem%20Bhojani-logo.png"
            alt="Naeem Bhojani Photography Logo"
            width={380}
            height={150}
            priority
            className="h-auto w-[230px] object-contain sm:w-[280px] lg:w-[320px]"
          />

          {/* Admin Panel Label */}
          <div className="mt-7 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#bd905c]" />

            <span className="rounded-full border border-[#bd905c]/70 px-7 py-2 text-lg font-semibold text-[#e6b979]">
              ADMIN PANEL
            </span>

            <span className="h-px w-12 bg-[#bd905c]" />
          </div>

          <p className="mx-auto mt-5 max-w-[390px] text-base italic leading-7 text-white/85 sm:text-lg">
            Manage your website content, gallery,
            <br className="hidden sm:block" />
            services, enquiries and more.
          </p>
        </div>

        {/* Bottom Branding */}
        <div className="relative z-10 mt-12 flex min-h-[220px] flex-1 items-end">
          <div className="absolute bottom-0 left-0 h-[260px] w-full bg-[radial-gradient(ellipse_at_30%_90%,rgba(176,112,54,0.27),transparent_65%)]" />

          <div className="relative mb-3 ml-3 font-serif text-3xl italic text-[#d5aa70]/90">
            Naeem Bhojani
            <span className="mt-2 block text-center text-[9px] not-italic tracking-[0.4em] text-white/70">
              PHOTOGRAPHY
            </span>
          </div>
        </div>
      </section>

      {/* RIGHT LOGIN SECTION */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#100f0e] px-5 py-16 sm:px-10 lg:px-12">

        {/* Background Decorative Shapes */}
        <div className="pointer-events-none absolute -right-32 -top-40 h-[650px] w-[180px] rotate-[38deg] border-x border-[#a87846]/20 bg-gradient-to-b from-[#76502f]/40 to-transparent" />

        <div className="pointer-events-none absolute -bottom-52 -right-20 h-[650px] w-[180px] rotate-[38deg] border-x border-[#a87846]/20" />

        {/* Back To Website */}
        <a
          href="/"
          className="absolute right-8 top-8 z-20 text-[11px] font-semibold tracking-[0.25em] text-[#d9ad70] transition hover:text-white"
        >
          BACK TO WEBSITE <ArrowRight className="ml-2 inline" size={15} />
        </a>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-[560px] rounded-[32px] border border-[#d0a16a] bg-[radial-gradient(ellipse_at_0%_0%,rgba(146,94,49,0.24),transparent_45%),linear-gradient(145deg,#211a14,#111110_60%,#19140f)] px-7 py-10 shadow-[0_0_55px_rgba(176,125,71,0.13)] sm:px-12 sm:py-12 lg:px-14">

          {/* Card Top Icon */}
          <div className="mx-auto flex size-[70px] items-center justify-center rounded-[20px] border border-[#d0a16a] bg-[#986b3d]/20 text-[#e5bc83] shadow-[0_0_25px_rgba(190,140,80,0.16)]">
            <UserRound size={37} strokeWidth={1.5} />
          </div>

          {/* Heading */}
          <div className="mt-3 text-center">
            <h2 className="font-serif text-3xl font-semibold sm:text-[38px]">
              Admin Login
            </h2>

            <p className="mt-2 text-sm text-white/80 sm:text-base">
              Sign in to access the admin panel
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="mt-9 space-y-4">

            {/* Email */}
            <div className="flex h-[60px] items-center gap-5 rounded-xl border border-white/30 bg-white/[0.045] px-5 transition focus-within:border-[#d2a16a]">
              <Mail size={25} className="shrink-0 text-[#e4d6c4]" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                autoComplete="username"
                required
                disabled={loading}
                className="h-full w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/75"
              />
            </div>

            {/* Password */}
            <div className="flex h-[60px] items-center gap-5 rounded-xl border border-white/30 bg-white/[0.045] px-5 transition focus-within:border-[#d2a16a]">
              <LockKeyhole
                size={25}
                className="shrink-0 text-[#e4d6c4]"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                required
                disabled={loading}
                className="h-full w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/75"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="shrink-0 text-white/75 transition hover:text-[#e4b978]"
              >
                {showPassword ? (
                  <EyeOff size={23} />
                ) : (
                  <Eye size={23} />
                )}
              </button>
            </div>

            {/* Remember Me */}
            <label className="flex cursor-pointer items-center gap-3 pt-1 text-sm text-white/90">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
                className="size-[19px] cursor-pointer accent-[#c18b50]"
              />

              Remember Me
            </label>

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex h-[60px] w-full items-center justify-center gap-4 rounded-xl border border-[#e0b47a] bg-gradient-to-r from-[#c18a55] to-[#81502c] text-lg font-semibold text-white shadow-[0_8px_25px_rgba(135,82,42,0.22)] transition duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Login"}

              {!loading && <ArrowRight size={23} />}
            </button>
          </form>

          {/* Bottom Decorative Line */}
          <div className="pointer-events-none relative mt-10 h-8 overflow-hidden">
            <svg
              viewBox="0 0 500 35"
              className="h-full w-full"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 22 C100 -8 145 4 220 22 S365 42 500 2"
                stroke="#a77a4d"
                strokeOpacity="0.28"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      </section>
    </main>
  );
}
