import { axiosInstance } from "@/lib/axios";
import { HobbyRequestDTO, HobbyResponseDTO } from "@/models/api";

import { create } from "zustand";

interface HobbyState {
  hobbies: HobbyResponseDTO[];
  setHobbies: (hobbies: HobbyResponseDTO[]) => void;

  createHobby: (hobby: HobbyRequestDTO) => void;
  fetchHobbiesByUserId: (userId: number, token: string) => void;
  clearHobbies: () => void;
}

export const useHobbyStore = create<HobbyState>((set) => ({
  hobbies: [],

  setHobbies: (hobbies: HobbyResponseDTO[]) => {
    set({ hobbies });
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
  },

  fetchHobbiesByUserId: async (userId: number, token: string) => {
    try{
     const response = await axiosInstance.get(`/hobbies/all/${userId}`, {
                 headers: { Authorization: `Bearer ${token}` },
               });
      set({ hobbies: response.data });
    }
    catch (err) {
      console.error("Failed to fetch hobbies:", err);
    }
  }

}));
