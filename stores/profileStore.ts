import { axiosInstance } from "@/lib/axios";
import { HobbyResponseDTO, UserResponseDTO } from "@/models/api";
import { create } from "zustand";


interface ProfileStore {
    viewedProfile: UserResponseDTO | null;
    viewedHobbies: HobbyResponseDTO[] | null;
    isLoading: boolean;
    fetchProfile: (userId: string, token: string) => Promise<void>;
    clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
    viewedProfile: null,
    isLoading: false,
    viewedHobbies: [],

    fetchProfile: async (userId: string, token: string) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.get(`/users/${userId}`, {
                 headers: { Authorization: `Bearer ${token}` }
            })
            if (response){
                set({ viewedProfile: response.data, 
                    viewedHobbies: response.data.hobbies, 
                    isLoading: false, })
            }
        } catch (error) {
            console.log("Failed to fetch user");
            set({
                viewedProfile: null,
                viewedHobbies: [],
                isLoading: false,
            });
            throw error;
        }
    },
    clearProfile: () => set({ viewedProfile: null}),


}))

