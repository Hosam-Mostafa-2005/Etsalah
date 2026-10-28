export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  role: "customer" | "technician" | "admin";
  avatar?: string;
  bookingCount?: number;
  createdAt?: string;
}

export interface Technician {
  _id: string;
  numericId: number;
  name: string;
  specialty: string;
  category: "ac" | "carpenter" | "plumber" | "glass" | "electrician" | string;
  phone: string;
  city: string;
  rating: number;
  reviewsCount: number;
  image: string;
  hourlyRate: number;
  experienceYears: number;
  bio: string;
  available: boolean;
  verified: boolean;
  skills: string[];
  reviews?: Review[];
}

export interface ServiceCategory {
  _id: string;
  key: string;
  nameAr: string;
  nameEn: string;
  description: string;
  icon: string;
  image: string;
  active: boolean;
  order: number;
  techniciansCount?: number;
}

export interface Booking {
  _id: string;
  orderNumber: string;
  user?: string;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  serviceCategory: string;
  technician?: {
    _id: string;
    numericId: number;
    name: string;
    specialty: string;
    phone: string;
    rating: number;
    image: string;
  };
  technicianNumericId?: number;
  scheduledDate: string;
  timeSlot: "morning" | "afternoon" | "evening" | "urgent" | string;
  details: string;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  estimatedPrice: number;
  notes?: string;
  ratingSubmitted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  technician: string;
  technicianNumericId?: number;
  user?: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  text: string;
  rating: number;
  city?: string;
  role?: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
  total?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}
