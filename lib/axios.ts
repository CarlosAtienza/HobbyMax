import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosInstance = <TData = unknown>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<TData>> => {
  const instance = axios.create({
    baseURL: process.env.EXPO_BASE_URL
  });
  return instance.request<TData>(config);
};
