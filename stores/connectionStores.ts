import { axiosInstance } from "@/lib/axios";
import { ConnectionResponseDTO } from "@/types";
import { create } from "zustand";

interface ConnectionState{
    connections: ConnectionResponseDTO[] | null;
    setConnections: (connections: ConnectionResponseDTO[]) => void;
    fetchConnectionsByUserId: (userId: number, token: string) => Promise<void>;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
    connections: null,
    setConnections: (connections) => set({ connections }),
    fetchConnectionsByUserId: async (userId: number, token: string) => {
        try {
            const response = await axiosInstance.get(`/connections/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ connections: response.data });
        } catch (err) {
            console.log("Failed to fetch connections");
        }
    }
}));