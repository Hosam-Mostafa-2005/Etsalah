import { api } from "./client";
import type { Testimonial, ApiResponse } from "./types";

export const testimonialsApi = {
  getAll: (): Promise<ApiResponse<Testimonial[]>> =>
    api.get<ApiResponse<Testimonial[]>>("/testimonials"),
};
