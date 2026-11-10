
import api from "./axios";

interface UploadImageResponse {
  success: boolean;
  message: string;
  data: {
    image: string;
    publicId: string;
    filename: string;
  };
}

export const uploadHomepageImage = async (
  file: File
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post<UploadImageResponse>(
    "/upload/homepage",
    formData
  );

  return response.data;
};
