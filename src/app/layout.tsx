
import type { Metadata } from "next";
import { connection } from "next/server";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SiteShell from "@/app/components/layout/site-shell";
import { getWebsiteSettings } from "@/services/api/settings.api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fetch SEO settings dynamically from backend
export async function generateMetadata(): Promise<Metadata> {
  await connection();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    const response = await getWebsiteSettings();

    const settings = response.settings;
    const seo = settings.seo;

    const siteName =
      settings.siteName || "Naeem Bhojani Photography";

    const metaTitle = seo?.metaTitle || siteName;

    const metaDescription =
      seo?.metaDescription ||
      "Discover timeless photography by Naeem Bhojani. Capturing weddings, portraits, events, products and life's beautiful stories.";

    const ogImage = seo?.ogImage || settings.logo;

    return {
      ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),

      title: {
        default: metaTitle,
        template: `%s | ${siteName}`,
      },

      description: metaDescription,

      keywords: seo?.keywords || [],

      applicationName: siteName,

      creator: "Naeem Bhojani",

      publisher: siteName,

      icons: {
        icon: settings.favicon || "/favicon.ico",
      },

      openGraph: {
        type: "website",
        locale: "en_IN",
        siteName,
        title: metaTitle,
        description: metaDescription,
        ...(ogImage ? { images: [{ url: ogImage }] } : {}),
      },

      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
        ...(ogImage ? { images: [ogImage] } : {}),
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Dynamic SEO metadata error:", error);

    return {
      ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),

      title: "Naeem Bhojani Photography",

      description:
        "Discover timeless photography by Naeem Bhojani. Capturing weddings, portraits, events, products and life's beautiful stories.",

      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
