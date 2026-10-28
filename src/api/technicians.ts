import { api } from "./client";
import type { Technician, ApiResponse } from "./types";

export interface TechnicianFilters {
  category?: string;
  city?: string;
  search?: string;
  minRating?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export const techniciansApi = {
  getTop: (): Promise<ApiResponse<Technician[]>> =>
    api.get<ApiResponse<Technician[]>>("/technicians/top"),

  getAll: (filters: TechnicianFilters = {}): Promise<ApiResponse<Technician[]>> => {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== "all") params.append("category", filters.category);
    if (filters.city && filters.city !== "all") params.append("city", filters.city);
    if (filters.search) params.append("search", filters.search);
    if (filters.minRating) params.append("minRating", String(filters.minRating));
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.page) params.append("page", String(filters.page));
    if (filters.limit) params.append("limit", String(filters.limit));

    const queryString = params.toString() ? `?${params.toString()}` : "";
    return api.get<ApiResponse<Technician[]>>(`/technicians${queryString}`);
  },

  getById: (id: string | number): Promise<ApiResponse<Technician>> =>
    api.get<ApiResponse<Technician>>(`/technicians/${id}`),
};
