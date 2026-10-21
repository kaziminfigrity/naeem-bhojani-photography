
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { useState } from "react";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-[18px] sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/Naeem Bhojani-logo.png"
            alt="Naeem Bhojani Photography"
            width={170}
            height={65}
            priority
            className="h-auto w-[110px] sm:w-[130px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-10">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`border-b pb-0.5 text-[15px] transition-colors duration-300 hover:border-[#d6b477] hover:text-[#d6b477] xl:text-[18px] ${
                  isActive
                    ? "border-[#d6b477] text-[#d6b477]"
                    : "border-transparent text-white/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Social Icons + CTA */}
        <div className="hidden items-center gap-3 lg:flex xl:gap-5">
          <Link
            href="https://www.instagram.com/"
            aria-label="Instagram"
            className="p-1 transition-colors hover:text-[#d6b477]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} />
          </Link>

          <Link
            href="https://www.facebook.com/"
            aria-label="Facebook"
            className="p-1 transition-colors hover:text-[#d6b477]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF size={20} />
          </Link>

          <Link
            href="https://www.youtube.com/"
            aria-label="YouTube"
            className="p-1 transition-colors hover:text-[#d6b477]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube size={21} />
          </Link>

          <span className="h-5 w-px bg-white/30" />

          <Link
            href="/contact"
            className="rounded-full border border-white/60 px-4 py-2 text-[13px] font-medium tracking-wide text-white transition hover:border-[#d6b477] hover:text-[#d6b477] xl:px-5 xl:py-[9px] xl:text-[14px]"
          >
            Book a Session&nbsp;→
          </Link>
        </div>

        
      {/* Mobile Menu Button */}
      <button
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="relative z-[100] flex h-10 w-10 shrink-0 items-center justify-center bg-transparent text-white lg:hidden"
      >
        {isMenuOpen ? (
          <X key="close" size={24} strokeWidth={2} />
        ) : (
          <Menu key="open" size={24} strokeWidth={2} />
        )}
      </button>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/15 bg-black/95 px-5 pb-6 pt-3 backdrop-blur-md sm:px-8 lg:hidden"
        >
          <div className="flex flex-col">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`border-b py-3.5 text-[14px] transition-colors duration-300 ${
                    isActive
                      ? "border-[#d6b477]/40 text-[#d6b477]"
                      : "border-white/10 text-white/80 hover:text-[#d6b477]"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item.label}

                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d6b477]" />
                    )}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Social Icons + CTA */}
          <div className="mt-5 flex items-center gap-5 pt-1">
            <Link
              href="https://www.instagram.com/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition hover:text-[#d6b477]"
            >
              <FaInstagram size={18} />
            </Link>

            <Link
              href="https://www.facebook.com/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition hover:text-[#d6b477]"
            >
              <FaFacebookF size={18} />
            </Link>

            <Link
              href="https://www.youtube.com/"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition hover:text-[#d6b477]"
            >
              <FaYoutube size={19} />
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="ml-auto rounded-full border border-[#d6b477] px-5 py-2.5 text-[12px] text-[#e5c58d] transition hover:bg-[#d6b477]/10"
            >
              Book a Session →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
