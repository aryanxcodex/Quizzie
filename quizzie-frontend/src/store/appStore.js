// store/useAppStore.ts (or .js)
import { create } from 'zustand';

export const useAppStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  theme: 'light',
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
}));

export default useAppStore;