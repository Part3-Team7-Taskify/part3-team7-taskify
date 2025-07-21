import axios from 'axios';
import { getAccessToken } from '@/utils/tokenhandler';

export const apiClient = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/16-7/',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
