import { axiosInstance } from '@/lib/axios';
import { HobbyLogResponseDTO, HobbyResponseDTO } from '@/models/api';
import { create } from 'zustand';


interface HobbyLogState {
    currentHobby: HobbyResponseDTO;
    hobbyLogs: HobbyLogResponseDTO[];
    weeklyLogs: HobbyLogResponseDTO[];
    setHobbyLogs: (hobbyLogs: HobbyLogResponseDTO[]) => void;
    setWeeklyLogs: (weeklyLogs: HobbyLogResponseDTO[]) => void;
    fetchHobbyLogs: (hobbyId: number, token: string) => void;

    
   
}

export const useHobbyLogStore = create<HobbyLogState>((set) => ({
    currentHobby: {} as HobbyResponseDTO,
    hobbyLogs: [],
    weeklyLogs: [],
    setWeeklyLogs: (weeklyLogs: HobbyLogResponseDTO[]) => set({ weeklyLogs }),
    setHobbyLogs: (hobbyLogs: HobbyLogResponseDTO[]) => set({ hobbyLogs }),
    fetchHobbyLogs: async (hobbyId: number, token: string) => {
        try {
            const response = await axiosInstance.get(`/hobby-logs/${hobbyId}`, {
                headers: {Authorization: `Bearer ${token}` }
            })
            set({hobbyLogs: response.data})
        } catch (err) {
            console.error("Failed to fetch hobby logs:", err);
        }
    },
    

}));