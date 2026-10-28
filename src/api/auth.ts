import { api } from "./client";
import type { AuthResponse, User, ApiResponse } from "./types";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  city?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  login: (data: LoginPayload): Promise<AuthResponse> =>
    api.post<AuthResponse>("/auth/login", data),

  register: (data: RegisterPayload): Promise<AuthResponse> =>
    api.post<AuthResponse>("/auth/register", data),

  getMe: (): Promise<ApiResponse<{ user: User }>> =>
    api.get<ApiResponse<{ user: User }>>("/auth/me"),

  updateProfile: (data: Partial<User>): Promise<ApiResponse<{ user: User }>> =>
    api.put<ApiResponse<{ user: User }>>("/auth/profile", data),

  logout: (): Promise<ApiResponse<null>> =>
    api.post<ApiResponse<null>>("/auth/logout"),
};
