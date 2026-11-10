
export interface ContactHeroData {
  eyebrow: string;
  heading: string;
  description: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  supportingText: string;
}

export interface ContactItem {
  _id?: string;
  title: string;
  detail: string;
  note: string;
  order: number;
  isActive: boolean;
}

export interface ContactSectionData {
  backgroundImage: string;
  heading: string;
  description: string;
  formHeading: string;
  formDescription: string;
  privacyNote: string;
  contactItems: ContactItem[];
  eventTypes: string[];
}

export interface ContactLocationData {
  eyebrow: string;
  heading: string;
  description: string;
  backgroundImage: string;
  studioName: string;
  address: string;
  mapQuery: string;
  directionsUrl: string;
  locationNote: string;
  mapCaption: string;
}

export interface ContactPageData {
  _id?: string;
  hero: ContactHeroData;
  contactSection: ContactSectionData;
  locationSection: ContactLocationData;
  updatedBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactPageResponse {
  success: boolean;
  message: string;
  data: ContactPageData;
}
