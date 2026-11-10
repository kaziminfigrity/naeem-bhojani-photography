
import api from "./axios";

import type {
  HomepageResponse,
  Homepage,
} from "@/types/homepage.types";

// GET Homepage Content
export const getHomepageContent =
  async (): Promise<HomepageResponse> => {
    const response = await api.get<HomepageResponse>("/homepage");

    return response.data;
  };

// UPDATE Homepage Content
export const updateHomepageContent = async (
  data: Partial<Homepage>
): Promise<HomepageResponse> => {
  const response = await api.put<HomepageResponse>("/homepage", data);

  return response.data;
};
