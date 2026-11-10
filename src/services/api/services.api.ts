
import api from "./axios";

import type { ServicesResponse, ServicesData, } from "@/types/services.types";

// GET Services Page Content
export const getServicesData = async (): Promise<ServicesResponse> => {
  const response = await api.get<ServicesResponse>("/services");

  return response.data;
};


// UPDATE Services Page Content
export const updateServicesData = async (
  data: ServicesData
): Promise<ServicesResponse> => {
  const response = await api.put<ServicesResponse>("/services", data);

  return response.data;
};