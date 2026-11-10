
import api from "./axios";

export interface AdminLoginData {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  token: string;
  admin: AdminUser;
}

export const loginAdmin = async (
  data: AdminLoginData
): Promise<AdminLoginResponse> => {
  const response = await api.post<AdminLoginResponse>(
    "/admin/login",
    data
  );

  return response.data;
};

export const getAdminProfile = async (token: string) => {
  const response = await api.get("/admin/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
