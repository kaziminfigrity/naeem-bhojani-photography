
export interface HomepageImage {
  image: string;
  alt: string;
  order: number;
}

export interface HomepageStat {
  value: string;
  label: string;
  icon?: string;
  order: number;
}

// 1. Hero Banner
export interface HeroSlide {
  image: string;
  alt: string;
  order: number;
}

export interface HeroStat {
  value: string;
  label: string;
  order: number;
}

export interface HeroSection {
  eyebrow: string;
  heading: string;
  description: string;
  slides: HeroSlide[];
  stats: HeroStat[];
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  showreelHref: string;
}

// 2. Services Section
export interface HomeService {
  title: string;
  image: string;
  alt: string;
  href: string;
  order: number;
  isActive: boolean;
}

export interface ServicesSectionData {
  eyebrow: string;
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  services: HomeService[];
}

// 3. Featured Gallery
export interface GalleryCategory {
  label: string;
  order: number;
  isActive: boolean;
}

export interface FeaturedGalleryItem {
  title: string;
  category: string;
  image: string;
  alt: string;
  order: number;
  isActive: boolean;
  layout?: string;
}

export interface FeaturedGallerySection {
  eyebrow: string;
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  categories: GalleryCategory[];
  items: FeaturedGalleryItem[];
  viewMoreLabel: string;
}

// 4. About Section
export interface AboutFeature {
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface HomeAboutSection {
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  photographerName: string;
  designation: string;
  buttonLabel: string;
  buttonHref: string;
  features: AboutFeature[];
}

// 5. Behind The Lens
export interface BehindLensService {
  title: string;
  image: string;
  alt: string;
  href: string;
  order: number;
  isActive: boolean;
}

export interface BehindTheLensSection {
  eyebrow: string;
  heading: string;
  description: string;
  backgroundImage: string;
  statsBackgroundImage: string;
  buttonLabel: string;
  buttonHref: string;
  services: BehindLensService[];
  stats: HomepageStat[];
}

// 6. Testimonials Section
export interface HomeTestimonial {
  name: string;
  quote: string;
  image: string;
  rating: number;
  order: number;
  isActive: boolean;
}

export interface HomeTestimonialsSection {
  eyebrow: string;
  heading: string;
  description: string;
  testimonials: HomeTestimonial[];
}

// 7. Wedding CTA Section
export interface WeddingCTASectionData {
  eyebrow: string;
  heading: string;
  description: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  storyTitle: string;
  storySubtitle: string;
  showreelHref: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  thumbnails: HomepageImage[];
}

// Complete Homepage Data
export interface Homepage {
  _id?: string;
  hero: HeroSection;
  services: ServicesSectionData;
  featuredGallery: FeaturedGallerySection;
  about: HomeAboutSection;
  behindTheLens: BehindTheLensSection;
  testimonials: HomeTestimonialsSection;
  weddingCTA: WeddingCTASectionData;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response
export interface HomepageResponse {
  success: boolean;
  message: string;
  data: Homepage;
}
