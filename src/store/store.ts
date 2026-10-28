import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../api/types";

export interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  isLoggedIn: () => boolean;

  // Toast UI state
  toast: ToastMessage | null;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  hideToast: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      toast: null,

      setAuth: (user: User, token: string) => {
        set({ user, token });
      },

      setUser: (user: User) => {
        set({ user });
      },

      logout: () => {
        set({ user: null, token: null });
      },

      isLoggedIn: () => {
        return Boolean(get().token && get().user);
      },

      showToast: (message: string, type: "success" | "error" | "info" = "success") => {
        const id = Date.now();
        set({ toast: { id, message, type } });
        setTimeout(() => {
          if (get().toast?.id === id) {
            set({ toast: null });
          }
        }, 4000);
      },

      hideToast: () => {
        set({ toast: null });
      },
    }),
    {
      name: "atsalah-auth",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
