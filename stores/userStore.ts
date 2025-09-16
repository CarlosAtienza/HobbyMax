import { UserResponseDTO } from "@/types/index";
import { create } from "zustand";

interface UserState {
  user: UserResponseDTO | null;
  setUser: (user: UserResponseDTO) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
