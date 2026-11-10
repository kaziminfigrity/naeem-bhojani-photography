
import type { FooterSettings } from "./footer.types";

export interface NavigationItem {
  label: string;
  href: string;
  order: number;
  isActive: boolean;
}

export interface HeaderCTA {
  label: string;
  href: string;
  isActive: boolean;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  youtube: string;
}

// Global SEO Settings
export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
}

// Individual Page SEO Settings
export interface PageSEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
}

// Page-wise SEO Collection
export interface PageSEO {
  home: PageSEOSettings;
  about: PageSEOSettings;
  services: PageSEOSettings;
  contact: PageSEOSettings;
  gallery: PageSEOSettings;
  testimonials: PageSEOSettings;
}

export interface WebsiteSettings {
  _id?: string;

  // General Settings
  siteName: string;
  logo: string;
  favicon: string;

  // Global SEO Settings
  seo: SEOSettings;

  // Individual Page SEO Settings
  pageSEO: PageSEO;

  // Contact Settings
  email: string;
  phone: string;
  address: string;

  // Social Settings
  socialLinks: SocialLinks;

  // Header Settings
  navigation: NavigationItem[];
  headerCTA: HeaderCTA;

  // Footer Settings
  footer?: FooterSettings;
}

export interface WebsiteSettingsResponse {
  success: boolean;
  message: string;
  settings: WebsiteSettings;
}
