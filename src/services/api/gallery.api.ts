import api from "./axios";
import type { GalleryResponse, GalleryData } from "@/types/gallery.types";

export const getGalleryData = async (): Promise<GalleryResponse> => {
  const response = await api.get<GalleryResponse>("/gallery");
  return response.data;
};

export const updateGalleryData = async (
  data: Partial<GalleryData>
): Promise<GalleryResponse> => {
  const response = await api.put<GalleryResponse>("/gallery", data);
  return response.data;
};