import api from "./axios";
import type { AboutResponse, AboutData } from "@/types/about.types";

export const getAboutData = async (): Promise<AboutResponse> => {
  const response = await api.get<AboutResponse>("/about");
  return response.data;
};

export const updateAboutData = async (
  data: Partial<AboutData>
): Promise<AboutResponse> => {
  const response = await api.put<AboutResponse>("/about", data);
  return response.data;
};