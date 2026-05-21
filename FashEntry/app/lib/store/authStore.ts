import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';



interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      accessToken: null,

      login: (userData: User, token: string) => set({
        user: userData,
        isAuthenticated: true,
        accessToken: token
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false,
        accessToken: null
      }),
      setAccessToken: (token: string) => set({ accessToken: token }),
      updateProfile: (updatedData) => set((state) => ({
        user: state.user
          ? { ...state.user, ...updatedData } // Gabungkan data lama dengan data baru
          : null
      })),
    }),
    {
      name: 'auth-storage', // Nama key di LocalStorage
    }
  )
);

export default useAuthStore;