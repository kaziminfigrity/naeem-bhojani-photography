
export interface AboutImage {
  _id?: string;
  src: string;
  alt: string;
  position: string;
  order: number;
}

export interface AboutHero {
  backgroundImage: string;
  backgroundImageAlt: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  highlightText: string;
  highlightText2: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  photographyTypes: string[];
}

export interface AboutStory {
  images: AboutImage[];
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  highlightText: string;
  paragraphs: string[];
  signatureText: string;
}

export interface AchievementStat {
  _id?: string;
  value: string;
  label: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface AboutPhilosophy {
  eyebrow: string;
  headingLine1: string;
  highlightText: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  images: AboutImage[];
}

export interface ExpertiseService {
  _id?: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  link: string;
  order: number;
  isActive: boolean;
}

export interface AboutExpertise {
  eyebrow: string;
  headingLine1: string;
  highlightText: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  services: ExpertiseService[];
}

export interface WhyChooseFeature {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface AboutWhyChooseUs {
  eyebrow: string;
  headingLine1: string;
  highlightText: string;
  description: string;
  features: WhyChooseFeature[];
}

export interface AboutWorkTogether {
  backgroundImage: string;
  backgroundImageAlt: string;
  eyebrow: string;
  headingLine1: string;
  highlightText: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export interface AboutData {
  _id: string;
  hero: AboutHero;
  story: AboutStory;
  achievementStats: AchievementStat[];
  philosophy: AboutPhilosophy;
  expertise: AboutExpertise;
  whyChooseUs: AboutWhyChooseUs;
  workTogether: AboutWorkTogether;
}

export interface AboutResponse {
  success: boolean;
  message: string;
  data: AboutData;
}
