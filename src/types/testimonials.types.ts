
export interface TestimonialsHero {
  eyebrow: string;
  heading: string;
  description: string;
  backgroundImage: string;
  backgroundImageAlt: string;
}

export interface Testimonial {
  _id?: string;
  name: string;
  service: string;
  review: string;
  rating: number;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewsSection {
  backgroundImage: string;
  eyebrow: string;
  heading: string;
  description: string;
  testimonials: Testimonial[];
}

export interface TestimonialsFinalCTA {
  backgroundImage: string;
  backgroundImageAlt: string;
  eyebrow: string;
  heading: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface TestimonialsData {
  _id?: string;
  hero: TestimonialsHero;
  reviewsSection: ReviewsSection;
  finalCTA: TestimonialsFinalCTA;
  updatedBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestimonialsResponse {
  success: boolean;
  message: string;
  data: TestimonialsData;
}
