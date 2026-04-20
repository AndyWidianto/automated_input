import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';



interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (userData: User) => set({
        user: userData,
        isAuthenticated: true
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false
      }),

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