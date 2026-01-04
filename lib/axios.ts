import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Request interceptor to attach the token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);


// Response Interceptor that handles token refresh
axiosInstance.interceptors.response.use(
  
  (response) => response, // Directly return successful responses.
  async error => {
    console.log("HEELLLLLLOOOOOOO");
    const originalRequest = error.config as any;
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("HI")
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      //If another request already started, refresh and retry
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
            .catch(err => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');

        if (!refreshToken){
          console.log('No refresh token available');
          throw new Error('No refresh token available');
        }
        console.log("trying to hit refresh endpoint");
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}/auth/refresh`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const { token, refreshToken: newRefreshToken, userId } = response.data;
        console.log("Token: ", refreshToken);
        await Promise.all([
          SecureStore.setItemAsync('token', token),
          SecureStore.setItemAsync('refreshToken', newRefreshToken),
        ]);

        useAuthStore.setState({
          token,
          refreshToken: newRefreshToken,
          userId: Number(userId),
          isAuthenticated: true,
        })
        
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;

        // Process queued requests
        processQueue(null, token);

        // Retry original request
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        //Token refresh failed, logout user
        processQueue(refreshError, null);
        const { logout } = useAuthStore.getState();
        await logout();

        return Promise.reject(refreshError);

      } finally {
          isRefreshing = false;
      }
    }
      return Promise.reject(error);
  }
  
);