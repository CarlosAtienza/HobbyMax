import { axiosInstance } from "@/lib/axios";
import { HobbyRequestDTO, HobbyResponseDTO } from "@/models/api";
import { getAllHobbies } from "@/src/api/hobby-controller";
import { create } from "zustand";

interface HobbyState {
  hobbies: HobbyResponseDTO[];
  fetchHobbies: (userId: number) => Promise<void>;
  createHobby: (hobby: HobbyRequestDTO) => void;
  clearHobbies: () => void;
}

export const useHobbyStore = create<HobbyState>((set) => ({
  hobbies: [],

  fetchHobbies: async (userId: number) => {
    try {
      const response = await getAllHobbies(userId);
      set({ hobbies: response.data });
    } catch (err) {
      console.error("Failed to fetch hobbies:", err);
    }
  },

  clearHobbies: () => set({ hobbies: [] }),
  createHobby: async (hobby: HobbyRequestDTO) => {
    try {
      const response = await axiosInstance.post("/hobbies", hobby, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      set((state) => ({ hobbies: [...state.hobbies, response.data] }));
    } catch (err) {
      console.error("Failed to create hobby:", err);
    }
  }

}));
