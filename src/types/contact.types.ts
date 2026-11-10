
export interface ContactEnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  message: string;
}

export interface ContactEnquiryResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    status: string;
    createdAt: string;
  };
}
