import { api } from "./client";
import type { Review, ApiResponse } from "./types";

export interface CreateReviewPayload {
  workerId: string | number;
  rating: number;
  comment: string;
  customerName?: string;
  bookingId?: string;
}

export const reviewsApi = {
  create: (data: CreateReviewPayload): Promise<ApiResponse<Review>> =>
    api.post<ApiResponse<Review>>("/reviews", data),

  getByTechnician: (workerId: string | number): Promise<ApiResponse<Review[]>> =>
    api.get<ApiResponse<Review[]>>(`/reviews/technician/${workerId}`),
};
