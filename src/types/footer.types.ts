
export interface FooterLink {
  label: string;
  href: string;
  order: number;
  isActive: boolean;
}

export interface FooterService {
  label: string;
  href: string;
  order: number;
  isActive: boolean;
}

export interface FooterLegalLink {
  label: string;
  href: string;
  isActive: boolean;
}

export interface FooterSettings {
  description: string;
  tagline: string;

  ctaEyebrow: string;
  ctaHeading: string;

  exploreTitle: string;
  quickLinks: FooterLink[];

  servicesTitle: string;
  services: FooterService[];

  contactTitle: string;
  phoneLabel: string;
  emailLabel: string;
  locationLabel: string;

  privacyPolicy: FooterLegalLink;
  terms: FooterLegalLink;

  copyrightText: string;
}

export interface FooterSettingsResponse {
  success: boolean;
  message: string;
  settings: {
    footer: FooterSettings;
  };
}
