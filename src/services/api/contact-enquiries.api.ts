
import api from "./axios";

export type EnquiryStatus =
  | "new"
  | "contacted"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface ContactEnquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string | null;
  message: string;
  status: EnquiryStatus;
  adminNote?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ContactEnquiriesResponse {
  success: boolean;
  message: string;
  count: number;
  data: ContactEnquiry[];
}

// Get all enquiries - Admin only
export const getAllContactEnquiries = async (
  token: string
): Promise<ContactEnquiriesResponse> => {
  const response = await api.get<ContactEnquiriesResponse>(
    "/contact-enquiries",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



export interface UpdateContactEnquiryPayload {
  status?: EnquiryStatus;
  adminNote?: string;
}

export interface UpdateContactEnquiryResponse {
  success: boolean;
  message: string;
  data: ContactEnquiry;
}

export const updateContactEnquiry = async (
  id: string,
  token: string,
  payload: UpdateContactEnquiryPayload
): Promise<UpdateContactEnquiryResponse> => {
  const response = await api.put<UpdateContactEnquiryResponse>(
    `/contact-enquiries/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const deleteContactEnquiry = async (
  id: string,
  token: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{
    success: boolean;
    message: string;
  }>(`/contact-enquiries/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};