import { api } from "./client";
import type { FAQ, ApiResponse } from "./types";

export const faqApi = {
  getAll: (): Promise<ApiResponse<FAQ[]>> =>
    api.get<ApiResponse<FAQ[]>>("/faq"),
};
