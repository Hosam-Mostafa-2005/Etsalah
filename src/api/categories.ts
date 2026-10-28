import { api } from "./client";
import type { ServiceCategory, ApiResponse } from "./types";

export const categoriesApi = {
  getAll: (): Promise<ApiResponse<ServiceCategory[]>> =>
    api.get<ApiResponse<ServiceCategory[]>>("/categories"),
};
