import { UserResponseDTO } from "@/models/api/userResponseDTO";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from 'jwt-decode';
import { create } from "zustand";

interface JWTPayload {
  exp: number;
  userId: number;
  [key: string]: any;
}

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    userId: number | null;
    //Current User profile data
    user: UserResponseDTO | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    isTokenExpired: () => boolean;
    getTokenExpirationTime: () => number | null; 
    initialize: () => Promise<void>;
    setUser: (user: UserResponseDTO, userId: string) => void;
    clearTokens: () => Promise<void>;
    setTokens: (token: string, refreshToken: string) => Promise<void>;
    logout: () => Promise<void>;
    getRefreshTokenExpirationTime: () => number | null;
    clearUser: () => Promise<void>;
    
    
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token: null,
    refreshToken: null,
    user: null,
    userId: null,
    isAuthenticated: false,
    isLoading: true,
    

    // Check if token is expired
  isTokenExpired: () => {
    const { token } = get();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      const currentTime = Date.now() / 1000;
      
      // Check if token expires in the next 30 seconds (buffer time)
      return decoded.exp < currentTime + 30;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  },

  // Get token expiration time in milliseconds
  getTokenExpirationTime: () => {
    const { token } = get();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      return decoded.exp * 1000; // Convert to milliseconds
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },
  getRefreshTokenExpirationTime: () => {
    const { refreshToken } = get();
    if (!refreshToken) return null;

    try {
        const decoded = jwtDecode<JWTPayload>(refreshToken);
        return decoded.exp * 1000; // convert seconds to milliseconds
    } catch (error) {
        console.error('Failed to decode refresh token:', error);
        return null;
    }
  },

    // Load tokens from securestore on app startup
    initialize: async () => {
        try {
            const [token, refreshToken, userIdStr, userStr] = await Promise.all([
                SecureStore.getItemAsync('token'),
                SecureStore.getItemAsync('refreshToken'),
                SecureStore.getItemAsync('userId'),
                SecureStore.getItemAsync('user'),
            ]);

            

            if (token && refreshToken) {
                set({
                    token,
                    refreshToken,
                    userId: userIdStr ? Number(userIdStr) : null,
                    user: userStr ? JSON.parse(userStr) : null,
                    isAuthenticated: true,
                    isLoading: false,

                });
                console.log(get().isAuthenticated);
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            console.log('Failed to initialize auth: ', error);
            set({ isLoading: false });
        }

    },
    //Saving both SecureStore and state
    setTokens: async (token, refreshToken) => {
        try {
            await Promise.all([
                SecureStore.setItemAsync('token', token),
                SecureStore.setItemAsync('refreshToken', refreshToken),
            ]);

            set({
                token,
                refreshToken,
                isAuthenticated: true,
            });
            } catch (error) {
            console.error('Failed to save tokens:', error);
            throw error;
        }
  },
    setUser: async (user: UserResponseDTO, userId: string) => {
        await SecureStore.setItemAsync("user", JSON.stringify(user));
        await SecureStore.setItemAsync("userId", userId)
        set({ user });
        set({ userId: Number(userId) });
    },

    clearUser: async () => {
        await SecureStore.deleteItemAsync("user");
        set({ user: null });
        set({ userId: null })
  },
   
    clearTokens: async () => {
        try {
            await Promise.all([
                SecureStore.deleteItemAsync('token'),
                SecureStore.deleteItemAsync('refreshToken'),
            ]);

            set({
                token: null,
                refreshToken: null,
                isAuthenticated: false,
            });
            } catch (error) {
            console.error('Failed to clear tokens:', error);
            }
    },

    logout: async () => {
        await Promise.all([
            get().clearTokens(),
            get().clearUser(),
        ]);
        // Navigate to login screen (you'll handle this in your navigation)
    },

   
}));
