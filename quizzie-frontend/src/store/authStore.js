import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchAuthStatus } from '@/api/auth';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      hydrateAuth: async () => {
        try {
          const data = await fetchAuthStatus();
          if (data.authenticated) {
            set({ user: data.user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (err) {
          console.error('Auth hydration failed:', err);
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
