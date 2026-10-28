import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { techniciansApi } from "../api/technicians";
import type { TechnicianFilters } from "../api/technicians";
import { categoriesApi } from "../api/categories";
import { bookingsApi } from "../api/bookings";
import type { CreateBookingPayload } from "../api/bookings";
import { reviewsApi } from "../api/reviews";
import type { CreateReviewPayload } from "../api/reviews";
import { contactApi } from "../api/contact";
import type { ContactPayload } from "../api/contact";
import { faqApi } from "../api/faq";
import { testimonialsApi } from "../api/testimonials";
import { authApi } from "../api/auth";
import { useAuthStore } from "../store/store";

// ================= Technicians Hooks =================
export const useTechnicians = (filters: TechnicianFilters = {}) => {
  return useQuery({
    queryKey: ["technicians", filters],
    queryFn: () => techniciansApi.getAll(filters),
    select: (res) => res.data,
  });
};

export const useTopTechnicians = () => {
  return useQuery({
    queryKey: ["technicians", "top"],
    queryFn: () => techniciansApi.getTop(),
    select: (res) => res.data,
  });
};

export const useTechnician = (id?: string | number) => {
  return useQuery({
    queryKey: ["technician", id],
    queryFn: () => techniciansApi.getById(id!),
    enabled: Boolean(id),
    select: (res) => res.data,
  });
};

// ================= Categories Hooks =================
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesApi.getAll(),
    select: (res) => res.data,
  });
};

// ================= Bookings Hooks =================
export const useMyBookings = (phone?: string) => {
  const token = useAuthStore((state) => state.token);
  return useQuery({
    queryKey: ["bookings", "my", token, phone],
    queryFn: () => bookingsApi.getMyBookings(phone),
    select: (res) => res.data,
    enabled: Boolean(token || phone),
  });
};

export const useBooking = (id?: string) => {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: () => bookingsApi.getById(id!),
    enabled: Boolean(id),
    select: (res) => res.data,
  });
};

export const useCreateBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => bookingsApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

export const useCancelBookingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookingsApi.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

// ================= Reviews Hooks =================
export const useCreateReviewMutation = (workerId?: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => reviewsApi.create(payload),
    onSuccess: () => {
      if (workerId) {
        queryClient.invalidateQueries({ queryKey: ["technician", String(workerId)] });
      }
      queryClient.invalidateQueries({ queryKey: ["technicians"] });
    },
  });
};

// ================= Contact Hooks =================
export const useContactMutation = () => {
  return useMutation({
    mutationFn: (payload: ContactPayload) => contactApi.send(payload),
  });
};

// ================= Content Hooks (FAQ & Testimonials) =================
export const useFaqs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: () => faqApi.getAll(),
    select: (res) => res.data,
  });
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => testimonialsApi.getAll(),
    select: (res) => res.data,
  });
};

// ================= Current User Hook =================
export const useCurrentUser = () => {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: ["auth", "me", token],
    queryFn: async () => {
      const res = await authApi.getMe();
      if (res.data?.user) {
        setUser(res.data.user);
      }
      return res.data.user;
    },
    enabled: Boolean(token),
    retry: false,
  });
};
