
export interface GalleryButton {
  label: string;
  href: string;
  order: number;
}

export interface GalleryHero {
  eyebrow: string;
  heading: string;
  description: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  buttons: GalleryButton[];
  decorativeCaption: string[];
}

export interface GalleryPhoto {
  _id?: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  size: string;
  order: number;
  isActive: boolean;
}

export interface GalleryCollections {
  eyebrow: string;
  heading: string;
  description: string;
  categories: string[];
  photos: GalleryPhoto[];
  bottomNote: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface GalleryTestimonialFeature {
  backgroundImage: string;
  backgroundImageAlt: string;
  quote: string;
  highlightedText: string;
  attribution: string;
}

export interface GalleryWeddingFeature {
  backgroundImage: string;
  backgroundImageAlt: string;
  eyebrow: string;
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  supportingText: string;
  supportingCaption: string;
}

export interface GallerySignatureHighlight {
  icon: "camera" | "layers" | "play" | "heart";
  title: string;
  subtitle: string;
  order: number;
  isActive: boolean;
}

export interface GallerySignatureButton {
  label: string;
  href: string;
  isActive: boolean;
}

export interface GallerySignatureFeature {
  isActive: boolean;
  eyebrow: string;
  heading: string;
  highlightedText: string;
  description: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  highlights: GallerySignatureHighlight[];
  exploreButton: GallerySignatureButton;
  reelButton: GallerySignatureButton;
}

export interface GalleryFinalCTA {
  backgroundImage: string;
  backgroundImageAlt: string;
  eyebrow: string;
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface GalleryData {
  _id?: string;

  hero: GalleryHero;
  collections: GalleryCollections;
  testimonialFeature: GalleryTestimonialFeature;
  weddingFeature: GalleryWeddingFeature;

  // Gallery Signature Feature Section
  signatureFeature: GallerySignatureFeature;

  finalCTA: GalleryFinalCTA;

  updatedBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryResponse {
  success: boolean;
  message: string;
  data: GalleryData;
}
