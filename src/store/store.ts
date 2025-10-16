import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  dateOfBirth: string;
};

export type Form = {
  id: string;
  name: string;
  phone: string;
  city: string;
  service: string;
  workerId: string;
  details: string;
};

type AuthState = {
  orders: Form[];
  addOrder: (order: Form) => void;
  removeOrder: (order: Form) => void;
  isSubmitted: () => boolean;

  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      orders: [],

      setUser: (user: User) => {
        set({ user });
      },

      logout: () => {
        set({ user: null });
      },

      isLoggedIn: () => {
        return Boolean(get().user);
      },

      addOrder: (order: Form) => {
        set((state) => ({ orders: [...state.orders, order] }));
      },

      removeOrder: (order: Form) => {
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== order.id),
        }));
      },

      isSubmitted: () => {
        return get().orders.length > 0;
      },
    }),
    {
      name: "atsalah-auth",
    }
  )
);
