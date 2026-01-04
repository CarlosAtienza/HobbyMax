import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/stores/authStore';
import * as SecureStore from "expo-secure-store";
import { useEffect, useRef } from 'react';


/**
 * Hook to proactively refresh tokens before they expire
 * Checks refreshToken validity if accessToken expires
 */
export const useTokenRefresh = () => {
  const { token, isAuthenticated, getTokenExpirationTime, getRefreshTokenExpirationTime, logout } = useAuthStore();
  const refreshTimerRef = useRef<number | null>(null);
  const isRefreshingRef = useRef(false);
  

  const refreshAccessToken = async () : Promise<boolean> => {
     try {
      console.log('[TokenRefresh] Manually refreshing access token...');
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      
      if (!refreshToken) {
        console.error('[AuthStore] No refresh token available');
        return false;
      }

      const response = await axiosInstance.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/auth/refresh`,
        { refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token: newToken, refreshToken: newRefreshToken, userId } = response.data;

      if (!newToken || !newRefreshToken) {
        console.error('[AuthStore] Invalid response from refresh endpoint');
        return false;
      }
      

      // Update tokens in SecureStore
      await Promise.all([
        SecureStore.setItemAsync('token', newToken),
        SecureStore.setItemAsync('refreshToken', newRefreshToken),
      ]);

      

      console.log('[AuthStore] Token refreshed successfully');
      return true;
    } catch (error: any) {
      console.error('[AuthStore] Failed to refresh token:', error.message);
      return false;
    }

  }

   /** Schedule the next token refresh */
  const scheduleRefresh = async () => {
    if (!token || !isAuthenticated) return;

    const accessTokenExpiry = getTokenExpirationTime();
    const refreshTokenExpiryStr = getRefreshTokenExpirationTime();
    const refreshTokenExpiry = refreshTokenExpiryStr ? Number(refreshTokenExpiryStr) : 0;

    const now = Date.now();

    // Logout immediately if refresh token expired
    if (!refreshTokenExpiry || refreshTokenExpiry <= now) {
      console.log('[TokenRefresh] Refresh token expired, logging out');
      await logout();
      return;
    }

    if (!accessTokenExpiry) {
      console.warn('[TokenRefresh] No access token expiration info, cannot schedule refresh');
      return;
    }

    const buffer = 5 * 60 * 1000; // 5 minutes
    const timeUntilRefresh = Math.max(0, accessTokenExpiry - now - buffer);

    if (timeUntilRefresh <= 0) {
      console.log('[TokenRefresh] Access token already expired or about to expire, refreshing now');
      if (!isRefreshingRef.current) {
        isRefreshingRef.current = true;
        const success = await refreshAccessToken();
        if (!success) await logout();
        isRefreshingRef.current = false;
      }
      return;
    }

    // Clear existing timer
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);

    console.log(`[TokenRefresh] Scheduling access token refresh in ${Math.round(timeUntilRefresh / 1000)}s`);
    refreshTimerRef.current = setTimeout(async () => {
      if (isRefreshingRef.current) return;
      isRefreshingRef.current = true;

      const success = await refreshAccessToken();
      if (!success) await logout();

      isRefreshingRef.current = false;
      // Schedule the next refresh
      scheduleRefresh();
    }, timeUntilRefresh) as unknown as number;
  };

  useEffect(() => {
    // Hydrate on mount
    scheduleRefresh();

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    };
  }, [token, isAuthenticated]);

  return null;

}