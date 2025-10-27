import { axiosInstance } from "@/lib/axios";
import { ConnectionResponseDTO } from "@/types";
import { create } from "zustand";

interface ConnectionState{
    connections: ConnectionResponseDTO[] | null;
    pendingConnections: ConnectionResponseDTO[] | null;
    setConnections: (connections: ConnectionResponseDTO[]) => void;
    setPendingConnections: (connections: ConnectionResponseDTO[]) => void;

    fetchConnectionsByUserId: (userId: number, token: string) => Promise<void>;
    fetchPendingConnectionsByUserId: (userId: number, token: string) => Promise<void>;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
    connections: null,
    pendingConnections: null,
    setConnections: (connections) => set({ connections }),
    setPendingConnections: (pendingConnections) => set({ pendingConnections }),
    fetchConnectionsByUserId: async (userId: number, token: string) => {
        try {
            const response = await axiosInstance.get(`/connections/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ connections: response.data });
        } catch (err) {
            console.log("Failed to fetch connections");
        }
    },
    fetchPendingConnectionsByUserId: async (userId: number, token: string) => {
        try {
            const response = await axiosInstance.get(`/connections/user/${userId}/pending`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            set ({pendingConnections: response.data});
        } catch(err) {
            console.log("Failed to fetch pending connections")
        }
    },
}));