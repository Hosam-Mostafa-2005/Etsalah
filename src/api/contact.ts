import { api } from "./client";
import type { ApiResponse } from "./types";

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const contactApi = {
  send: (data: ContactPayload): Promise<ApiResponse<{ _id: string }>> =>
    api.post<ApiResponse<{ _id: string }>>("/contact", data),
};
