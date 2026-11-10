import type { Metadata } from "next";

import { getWebsiteSettings } from "@/services/api/settings.api";
import type { PageSEOSettings } from "@/types/settings.types";

type SEOPage = "home" | "about" | "services" | "contact" | "gallery" | "testimonials";

interface SEOFallback {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonical: string;
}

export async function getPageSEO(
  page: SEOPage,
  fallback: SEOFallback
): Promise<Metadata> {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || ""
  ).replace(/\/$/, "");

  let pageSEO: PageSEOSettings | undefined;
  let globalSEO;
  let siteName = "Naeem Bhojani Photography";

  try {
    const response = await getWebsiteSettings();
    const settings = response.settings;

    if (settings) {
      pageSEO = settings.pageSEO?.[page];
      globalSEO = settings.seo;
      siteName = settings.siteName || siteName;
    }
  } catch (error) {
    console.error(`Failed to load ${page} SEO settings:`, error);
  }

  const title =
    pageSEO?.metaTitle?.trim() ||
    fallback.title ||
    globalSEO?.metaTitle?.trim() ||
    siteName;

  const description =
    pageSEO?.metaDescription?.trim() ||
    fallback.description ||
    globalSEO?.metaDescription?.trim() ||
    "";

  const keywords =
    pageSEO?.keywords?.filter(Boolean).length
      ? pageSEO.keywords.filter(Boolean)
      : fallback.keywords.length
        ? fallback.keywords
        : globalSEO?.keywords || [];

  const ogImage =
    pageSEO?.ogImage?.trim() ||
    globalSEO?.ogImage?.trim() ||
    "";

  const canonical = `${siteUrl}${fallback.canonical}`;

  const ogTitle = fallback.ogTitle || title;
  const ogDescription = fallback.ogDescription || description;
  const twitterTitle = fallback.twitterTitle || title;
  const twitterDescription = fallback.twitterDescription || description;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "website",
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName,
      locale: "en_IN",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}