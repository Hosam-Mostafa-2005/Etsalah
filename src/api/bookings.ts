import { api } from "./client";
import type { Booking, ApiResponse } from "./types";

export interface CreateBookingPayload {
  customerName?: string;
  customerPhone?: string;
  city?: string;
  address?: string;
  serviceCategory: string;
  workerId?: string | number;
  scheduledDate?: string;
  timeSlot?: string;
  details: string;
  notes?: string;
}

export const bookingsApi = {
  create: (data: CreateBookingPayload): Promise<ApiResponse<Booking>> =>
    api.post<ApiResponse<Booking>>("/bookings", data),

  getMyBookings: (phone?: string): Promise<ApiResponse<Booking[]>> => {
    const query = phone ? `?phone=${encodeURIComponent(phone)}` : "";
    return api.get<ApiResponse<Booking[]>>(`/bookings/my${query}`);
  },

  getById: (id: string): Promise<ApiResponse<Booking>> =>
    api.get<ApiResponse<Booking>>(`/bookings/${id}`),

  cancel: (id: string): Promise<ApiResponse<Booking>> =>
    api.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`),
};
