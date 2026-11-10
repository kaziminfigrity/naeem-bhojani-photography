
import api from "./axios";

import type { WebsiteSettingsResponse, WebsiteSettings } from "@/types/settings.types";
import type { FooterSettingsResponse } from "@/types/footer.types";

// GET Website Settings
export const getWebsiteSettings = async (): Promise<WebsiteSettingsResponse> => {
  const response = await api.get<WebsiteSettingsResponse>("/settings");
  return response.data;
};

// UPDATE Website Settings
export const updateWebsiteSettings = async (
  data: Partial<WebsiteSettings>
): Promise<WebsiteSettingsResponse> => {
  const response = await api.put<WebsiteSettingsResponse>("/settings", data);
  return response.data;
};

// GET Footer Settings
export const getFooterSettings = async (): Promise<FooterSettingsResponse> => {
  const response = await api.get<FooterSettingsResponse>("/settings");
  return response.data;
};
