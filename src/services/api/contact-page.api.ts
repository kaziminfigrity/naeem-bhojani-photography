
import api from "./axios";

import type {
  ContactPageResponse,
  ContactPageData,
} from "@/types/contact-page.types";

export const getContactPageData =
  async (): Promise<ContactPageResponse> => {
    const response = await api.get<ContactPageResponse>("/contact");

    return response.data;
  };

export const updateContactPageData =
  async (
    data: ContactPageData
  ): Promise<ContactPageResponse> => {
    const response = await api.put<ContactPageResponse>(
      "/contact",
      data
    );

    return response.data;
  };
