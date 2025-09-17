
import { axiosInstance } from "@/lib/axios";
import { HobbyResponseDTO } from "@/models/api";
import { create } from "zustand";

interface HobbyState {
  hobbies: HobbyResponseDTO[];
  fetchHobbies: (userId: number) => Promise<void>;
  clearHobbies: () => void;
}

export const useHobbyStore = create<HobbyState>((set) => ({
  hobbies: [],

  fetchHobbies: async (userId: number) => {
    try {
      const response = await axiosInstance.get<HobbyResponseDTO[]>(`/hobbies/all/${userId}`);
      set({ hobbies: response.data });
    } catch (err) {
      console.error("Failed to fetch hobbies:", err);
    }
  },

  clearHobbies: () => set({ hobbies: [] }),
}));
