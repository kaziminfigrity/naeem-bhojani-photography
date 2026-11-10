
export interface ServiceButton {
  label: string;
  href: string;
  order: number;
}

export interface ServiceStat {
  value: string;
  label: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface ServicesHero {
  eyebrow: string;
  heading: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  buttons: ServiceButton[];
  stats: ServiceStat[];
}

export interface ServiceCard {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  order: number;
  isActive: boolean;
}

export interface ServicesList {
  eyebrow: string;
  heading: string;
  description: string;
  secondaryDescription: string;
  closingText: string;
  ctaLabel: string;
  ctaHref: string;
  items: ServiceCard[];
}

export interface ServiceFeature {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface WhyChooseUs {
  eyebrow: string;
  heading: string;
  description: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  features: ServiceFeature[];
}

export interface ProcessStep {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface HowItWorks {
  eyebrow: string;
  heading: string;
  description: string;
  closingHeading: string;
  closingDescription: string;
  steps: ProcessStep[];
}

export interface ContactCTA {
  eyebrow: string;
  heading: string;
  description: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  buttonLabel: string;
  buttonHref: string;
  features: ServiceFeature[];
}

export interface ServicesData {
  _id?: string;
  hero: ServicesHero;
  services: ServicesList;
  whyChooseUs: WhyChooseUs;
  howItWorks: HowItWorks;
  contactCTA: ContactCTA;
  updatedBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServicesResponse {
  success: boolean;
  message: string;
  data: ServicesData;
}
