
import api from "./axios";

import type {
  ContactEnquiryPayload,
  ContactEnquiryResponse,
} from "@/types/contact.types";

export const submitContactEnquiry = async (
  payload: ContactEnquiryPayload
): Promise<ContactEnquiryResponse> => {
  const response = await api.post<ContactEnquiryResponse>(
    "/contact-enquiries",
    payload
  );

  return response.data;
};
