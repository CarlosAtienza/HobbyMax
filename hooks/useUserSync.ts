import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useRef } from "react";


export const useUserSync = () => {
  const { token, isAuthenticated, user, setUser, logout } = useAuthStore();
  const isFetchingRef = useRef(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Skip if not authenticated or already have user data
    if (!isAuthenticated || !token || user !== null) {
      return;
    }

    // Skip if already fetching or already fetched this session
    if (isFetchingRef.current || hasFetchedRef.current) {
      return;
    }

    const fetchUserData = async () => {
      isFetchingRef.current = true;
      console.log('[UserSync] Fetching user data...');

      try {
        // Fetch user profile from your API
        const response = await axiosInstance.get('/user/profile'); // Adjust endpoint as needed
        
        console.log('[UserSync] User data fetched successfully');
        setUser(response.data, response.data.userId);
        hasFetchedRef.current = true;
        
      } catch (error: any) {
        console.error('[UserSync] Failed to fetch user data:', error.message);
        
        // If it's an auth error, the interceptor will handle it
        // If it's a different error, we can retry or logout depending on severity
        if (error.response?.status === 404) {
          console.error('[UserSync] User not found, logging out');
          await logout();
        }
        // For other errors (network, etc), just log - user can try again later
      } finally {
        isFetchingRef.current = false;
      }
    };

    fetchUserData();
  }, [isAuthenticated, token, user, setUser, logout]);

  return null;
};