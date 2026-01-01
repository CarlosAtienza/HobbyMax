import { UserResponseDTO } from "@/types";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
    token: string | null;
    userId: number | null;
    //Current User profile data
    user: UserResponseDTO | null;
    setUser: (user: UserResponseDTO) => void;
    setToken: (token: string) => void;

    logout: () => Promise<void>;
    loadToken: () => Promise<{ token: string | null; userId: number | null }>;
    
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    userId: null,
    setToken: (token: string ) => set({ token }),
    setUser: (user: UserResponseDTO) => set({ user }),
   

    logout: async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("userId");
        set({ token: null, userId: null });
    },

    loadToken: async () => {
        const storedToken = await SecureStore.getItemAsync("token");
        const savedUserId = await SecureStore.getItemAsync("userId");
        const parsedUserId = savedUserId !== null ? Number(savedUserId) : null;

        if (storedToken) set({ token: storedToken, userId: parsedUserId});
        
        return {token: storedToken, userId: parsedUserId};
    },
   
}));
