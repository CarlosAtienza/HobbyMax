import { AuthResponseDTO } from '@/models/api';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  
});


// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token;
//     console.log("Attaching token to request:", token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  response => response, // Directly return successful responses.
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        const { loadToken, setToken, logout } = useAuthStore.getState();

        if (!refreshToken) {
          logout();
          return Promise.reject('No refresh token available');
        }


        // Make a request to your auth server to refresh the token.
        const response = await axiosInstance.post('auth/refresh',{ 
          refreshToken,
        });

        const authResponse: AuthResponseDTO = {
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          userId: response.data.userId,
          username: response.data.username
        };


        // Store the new access and refresh tokens.
        SecureStore.setItemAsync('token', authResponse.token ?? '');
        SecureStore.setItemAsync('refreshToken', authResponse.refreshToken ?? '');
        setToken(authResponse.token ?? '');
      
        // Update the authorization header with the new access token.
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authResponse.token ?? ''}`;
        return axiosInstance(originalRequest); // Retry the original request with the new access token.

      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error('Token refresh failed:', refreshError);
        const { logout } = useAuthStore.getState();
        logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);