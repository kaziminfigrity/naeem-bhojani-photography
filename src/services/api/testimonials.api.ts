import api from "./axios";
import type {
  TestimonialsResponse,
  TestimonialsData,
  Testimonial,
} from "@/types/testimonials.types";

// GET complete testimonials page
export const getTestimonialsData = async (): Promise<TestimonialsResponse> => {
  const response = await api.get<TestimonialsResponse>("/testimonials");
  return response.data;
};

// UPDATE Hero, Reviews Section, or Final CTA
export const updateTestimonialsData = async (
  data: Partial<Pick<TestimonialsData, "hero" | "reviewsSection" | "finalCTA">>
): Promise<TestimonialsResponse> => {
  const response = await api.put<TestimonialsResponse>("/testimonials", data);
  return response.data;
};

// ADD testimonial
export const addTestimonial = async (
  data: Omit<Testimonial, "_id" | "createdAt" | "updatedAt">
): Promise<TestimonialsResponse> => {
  const response = await api.post<TestimonialsResponse>(
    "/testimonials/reviews",
    data
  );
  return response.data;
};

// UPDATE individual testimonial
export const updateTestimonial = async (
  id: string,
  data: Partial<Testimonial>
): Promise<TestimonialsResponse> => {
  const response = await api.put<TestimonialsResponse>(
    `/testimonials/reviews/${id}`,
    data
  );
  return response.data;
};

// DELETE testimonial
export const deleteTestimonial = async (
  id: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await api.delete(`/testimonials/reviews/${id}`);
  return response.data;
};