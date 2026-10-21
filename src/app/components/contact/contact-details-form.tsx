
"use client";

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";

function ContactIcon({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d6a83e]/80 text-[#efbd55] transition-colors duration-300 group-hover:bg-[#e9b84f]/10 sm:h-[54px] sm:w-[54px]">
      {children}
    </div>
  );
}

const contactItems = [
  {
    title: "Phone",
    detail: "+91 98765 43210",
    note: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M7 3H4.8A1.8 1.8 0 0 0 3 4.8C3 13.7 10.3 21 19.2 21a1.8 1.8 0 0 0 1.8-1.8V17l-5-2-2 2a15 15 0 0 1-6-6l2-2-3-6Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Email",
    detail: "info@naeembhojani.com",
    note: "We typically reply within 24 hours",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="m4 7 8 6 8-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Location",
    detail: "Ahmedabad, Gujarat, India",
    note: "Visit our studio by appointment",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle
          cx="12"
          cy="10"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Working Hours",
    detail: "Mon - Sat: 10:00 AM - 7:00 PM",
    note: "Sunday: By Appointment",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12 6.5V12l4 2.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const inputClass =
  "h-[50px] w-full rounded-md border border-white/15 bg-black/25 px-4 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-[#d9ac4d] focus:bg-black/40";

export default function ContactDetailsForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Connect your email service or backend API here.
    setSubmitted(true);
  }

  return (
    <section className="relative isolate overflow-hidden border-y border-[#d8b45e]/30 bg-[#090908] text-white">
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/images/contact-section-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#090908]/75" />

      {/* Subtle gold ambience */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_50%,rgba(143,91,30,0.12),transparent_65%)]" />

      <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-16 lg:py-20">
        {/* LEFT: Contact information */}
        <div className="flex flex-col justify-center">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#e9b84f]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e9b84f] sm:text-xs">
              Contact Information
            </p>
            <span className="h-px w-8 bg-[#e9b84f]/60" />
          </div>

          <h2 className="max-w-[560px] font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Let’s Talk About
            <br />
            Your{" "}
            <span className="italic text-[#e9b84f]">
              Special Moments
            </span>
          </h2>

          <p className="mt-5 max-w-[510px] text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            Feel free to reach out to us through any of the following
            channels. We’re always happy to connect and discuss your
            photography needs.
          </p>

          <div className="mt-8 space-y-6 sm:mt-9 sm:space-y-7">
            {contactItems.map((item) => (
              <div
                key={item.title}
                className="group flex items-center gap-4 sm:gap-5"
              >
                <ContactIcon>{item.icon}</ContactIcon>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1 break-words text-sm text-white/90 sm:text-base">
                    {item.detail}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/60 sm:text-sm">
                    {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Booking form */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl bg-[#d4a342]/[0.08] blur-xl" />

          <div className="relative rounded-xl border border-[#b98b35]/60 bg-[#111110]/95 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-8 lg:p-9">
            <div className="mb-6 flex items-center gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e9b84f] sm:text-xs">
                Send Us a Message
              </p>
              <span className="h-px w-8 bg-[#e9b84f]/70" />
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl">
              Book a{" "}
              <span className="italic text-[#e9b84f]">Session</span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/65">
              Fill out the form below and we’ll get back to you as soon as
              possible.
            </p>

            {submitted ? (
              <div
                role="status"
                className="mt-8 rounded-lg border border-[#e9b84f]/40 bg-[#e9b84f]/[0.06] p-6"
              >
                <p className="font-serif text-2xl text-[#e9b84f]">
                  Thank you for reaching out!
                </p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Your form interaction is complete. Connect an email
                  service or backend API to receive booking enquiries.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 text-sm text-[#e9b84f] underline underline-offset-4"
                >
                  Back to form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your Name *"
                  aria-label="Your name"
                  required
                  className={inputClass}
                />

                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your Email *"
                  aria-label="Your email"
                  required
                  className={inputClass}
                />

                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone Number"
                  aria-label="Phone number"
                  className={inputClass}
                />

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <select
                    name="eventType"
                    aria-label="Event type"
                    defaultValue=""
                    required
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled className="bg-[#111110]">
                      Event Type *
                    </option>
                    <option className="bg-[#111110]">Wedding</option>
                    <option className="bg-[#111110]">Pre-Wedding</option>
                    <option className="bg-[#111110]">Birthday</option>
                    <option className="bg-[#111110]">Maternity</option>
                    <option className="bg-[#111110]">Corporate Event</option>
                    <option className="bg-[#111110]">Sports Event</option>
                    <option className="bg-[#111110]">Product Photography</option>
                    <option className="bg-[#111110]">Education Event</option>
                    <option className="bg-[#111110]">Other</option>
                  </select>

                  <input
                    name="eventDate"
                    type="date"
                    aria-label="Event date"
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Your Message *"
                  aria-label="Your message"
                  required
                  rows={5}
                  className="min-h-[130px] w-full resize-y rounded-md border border-white/15 bg-black/25 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/50 focus:border-[#d9ac4d] focus:bg-black/40"
                />

                <button
                  type="submit"
                  className="group flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-[#f4c35f] px-6 text-sm font-bold text-[#171009] transition duration-300 hover:bg-[#ffda8b] hover:shadow-[0_0_28px_rgba(233,184,79,0.2)]"
                >
                  Send Message
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
                </button>

                <p className="pt-1 text-center text-[10px] leading-5 text-white/50">
                  Your details will be used only to respond to your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Light gold borders */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#e9c878]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#e9c878]/50 to-transparent" />
    </section>
  );
}
