import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

interface AuthState {
    isSignedIn: boolean;
    setSignedIn: (signedIn: boolean) => void;
    checkToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isSignedIn: false,
    setSignedIn: (signedIn: boolean) => set({ isSignedIn: signedIn }),
    checkToken: async () => {
        const token = await SecureStore.getItemAsync("token");
        set({ isSignedIn: !!token });
    },
}));
